import bcrypt from 'bcryptjs';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { Post } from 'sections/GuestBook';
import { db } from 'utils/firebase';
import AllContentsPostCard from './AllContentsPostCard';
import PostFormModal, { FormType, GuestBookPostForm } from './PostFormModal';

const PostCardsContainer = styled.div`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: #ccc;
  }
`;

interface PostWithPassword extends Post {
  password: string;
}

interface AllPostsModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function AllPostsModal({ isOpen, handleClose }: AllPostsModalProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [targetPost, setTargetPost] = useState<Post | undefined>(undefined);
  const [formType, setFormType] = useState<FormType>('edit');
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  const fetchData = async () => {
    const dataQuery = query(
      collection(db, 'guestBook'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(dataQuery);
    setPosts(
      querySnapshot.docs.map((doc) => {
        const { name, password, content, createdAt } = doc.data();
        return {
          id: doc.id,
          name,
          password,
          content,
          createdAt: createdAt.toDate(),
        };
      })
    );
  };

  const handleOpenEditForm = (post: Post) => {
    window.gtag?.('event', 'open_guestbook_edit_form');
    setTargetPost(post);
    setFormType('edit');
    setIsFormModalOpen(true);
  };
  const handleOpenDeleteForm = (post: Post) => {
    window.gtag?.('event', 'open_guestbook_delete_form');
    setTargetPost(post);
    setFormType('delete');
    setIsFormModalOpen(true);
  };
  const handleFormModalClose = () => {
    setIsFormModalOpen(false);
  };

  const onEditFormValid = async (data: GuestBookPostForm) => {
    const { id, name, password, content } = data;
    if (!id) return false;

    const docRef = doc(db, 'guestBook', id);
    const document = await getDoc(docRef);
    if (!document.exists()) {
      return false;
    }

    const post = document.data() as PostWithPassword;
    const isPasswordMatched = await bcrypt.compare(password, post.password);
    if (!isPasswordMatched) {
      toast.error('비밀번호가 틀렸어요.');
      return false;
    }

    await updateDoc(docRef, { name, content });
    toast.info('게시글이 수정되었어요!');
    setIsFormModalOpen(false);
    fetchData();
    window.gtag?.('event', 'edit_guest_book', { name: post.name });
    return true;
  };

  const onDeleteFormValid = async (data: GuestBookPostForm) => {
    const { id, password } = data;
    if (!id) return false;

    const document = await getDoc(doc(db, 'guestBook', id));
    if (!document.exists()) {
      return false;
    }

    const post = document.data() as PostWithPassword;
    const isPasswordMatched = await bcrypt.compare(password, post.password);
    if (!isPasswordMatched) {
      toast.error('비밀번호가 틀렸어요.');
      return false;
    }

    await deleteDoc(doc(db, 'guestBook', id));
    toast.info('게시글이 삭제되었어요!');
    setIsFormModalOpen(false);
    fetchData();
    window.gtag?.('event', 'delete_guest_book', { name: post.name });
    return true;
  };

  return (
    <Modal
      isOpen={isOpen}
      className="bg-white rounded-2xl flex flex-col py-4 px-2 w-80 text-center max-h-full"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/[.40] items-center justify-center flex h-full py-8"
      onAfterOpen={() => {
        fetchData();
      }}
    >
      <div className="text-center">
        <h2>모든 게시글</h2>
        <hr className="my-4" />
        <div className=""></div>
      </div>
      {posts.length === 0 ? (
        <div className="flex flex-col scroll px-2 py-8">
          <span>아직 아무 글도 없어요.</span>
          <span>새 글을 남겨보세요!</span>
        </div>
      ) : (
        <PostCardsContainer className="flex flex-col overflow-y-auto divide-y space-y-8 scroll px-2">
          {posts.map((post) => (
            <AllContentsPostCard
              key={post.id}
              post={post}
              handleOpenEditForm={handleOpenEditForm}
              handleOpenDeleteForm={handleOpenDeleteForm}
            />
          ))}
        </PostCardsContainer>
      )}
      <div className="flex flex-row justify-center mt-4">
        <button
          className="flex bg-stone-300  py-2 rounded-md justify-center text-sm w-24"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
      {targetPost && (
        <PostFormModal
          type={formType}
          isOpen={isFormModalOpen}
          handleClose={handleFormModalClose}
          onFormValid={
            formType === 'edit' ? onEditFormValid : onDeleteFormValid
          }
          post={targetPost}
        />
      )}
    </Modal>
  );
}

export default AllPostsModal;

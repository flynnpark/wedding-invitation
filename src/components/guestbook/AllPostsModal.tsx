import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
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

  const handleOpenDeleteForm = (post: Post) => {
    window.gtag?.('event', 'open_guestbook_delete_form');
    setFormType('delete');
    setTargetPost(post);
    setIsFormModalOpen(true);
  };
  const handleFormModalClose = () => setIsFormModalOpen(false);

  const onFormValid = async (data: GuestBookPostForm) => {
    const { id, password } = data;
    if (!id) return false;

    const document = await getDoc(doc(db, 'guestBook', id));
    if (!document.exists()) {
      return false;
    }

    const post = document.data() as PostWithPassword;
    if (post.password !== password) {
      toast.error('비밀번호가 틀렸어요.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    await deleteDoc(doc(db, 'guestBook', id));
    toast.info('게시글이 삭제되었어요!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
        document.body.style.overflow = 'hidden';
        fetchData();
      }}
      onRequestClose={() => {
        document.body.removeAttribute('style');
      }}
    >
      <div className="text-center">
        <h2>모든 게시글</h2>
        <hr className="my-4" />
        <div className=""></div>
      </div>
      <PostCardsContainer className="flex flex-col overflow-y-auto divide-y space-y-8 scroll px-2">
        {posts.map((post) => (
          <AllContentsPostCard
            key={post.id}
            post={post}
            handleOpenForm={handleOpenDeleteForm}
          />
        ))}
      </PostCardsContainer>
      <div className="flex flex-row justify-center mt-4">
        <button
          className="flex bg-stone-300  py-2 rounded-md justify-center text-sm w-24"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
      <PostFormModal
        type={formType}
        isOpen={isFormModalOpen}
        handleClose={handleFormModalClose}
        onFormValid={onFormValid}
        post={targetPost}
      />
    </Modal>
  );
}

export default AllPostsModal;

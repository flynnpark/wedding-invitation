import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Post } from 'sections/GuestBook';
import { db } from 'utils/firebase';
import AllContentsPostCard from './AllContentsPostCard';
import PostFormModal, { FormType } from './PostFormModal';

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
    const dataQuery = query(collection(db, 'guestBook'), orderBy('createdAt'));
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDeleteForm = (post: Post) => {
    window.gtag?.('event', 'open_guestbook_delete_form');
    setFormType('delete');
    setTargetPost(post);
    setIsFormModalOpen(true);
  };
  const handleFormModalClose = () => setIsFormModalOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      className="bg-white rounded-2xl flex flex-col p-4 w-80 text-center max-h-full"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/[.40] items-center justify-center flex h-full py-2"
      onAfterOpen={() => {
        document.body.style.overflow = 'hidden';
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
      <div className="flex flex-col overflow-y-auto divide-y space-y-8">
        {posts.map((post) => (
          <AllContentsPostCard
            key={post.id}
            post={post}
            handleOpenForm={handleOpenDeleteForm}
          />
        ))}
      </div>
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
        onFormValid={() => {}}
        post={targetPost}
      />
    </Modal>
  );
}

export default AllPostsModal;

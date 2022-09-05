import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import AllPostsModal from 'components/guestbook/AllPostsModal';
import PostFormModal, {
  GuestBookPostForm,
} from 'components/guestbook/PostFormModal';
import SimplePostCard from 'components/guestbook/SimplePostCard';
import Section from 'components/Section';
import { db } from 'utils/firebase';

const PostsContainer = styled.div`
  &::-webkit-scrollbar {
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: #ccc;
  }
`;

export interface Post {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}

function GuestBook() {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isPostsModalOpen, setIsPostsModalOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleFormModalOpen = () => {
    window.gtag?.('event', 'open_guestbook_form');
    setIsFormModalOpen(true);
  };
  const handleFormModalClose = () => setIsFormModalOpen(false);

  const handlePostsModalOpen = () => {
    window.gtag?.('event', 'open_guestbook_posts');
    setIsPostsModalOpen(true);
  };
  const handlePostsModalClose = () => setIsPostsModalOpen(false);

  const fetchData = async () => {
    const dataQuery = query(
      collection(db, 'guestBook'),
      orderBy('createdAt', 'desc'),
      limit(10)
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

  useEffect(() => {
    fetchData();
  }, []);

  const onFormValid = async (data: GuestBookPostForm) => {
    const { name, password, content } = data;
    window.gtag?.('event', 'write_guest_book');
    const createdAt = new Date();
    const docRef = await addDoc(collection(db, 'guestBook'), {
      name,
      password,
      content,
      isDeleted: false,
      createdAt,
    });
    addNewPost(docRef.id, name, content, createdAt);
    setIsFormModalOpen(false);
    toast.info('게시글이 작성되었어요!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return true;
  };

  const addNewPost = (
    id: string,
    name: string,
    content: string,
    createdAt: Date
  ) => {
    setPosts([
      {
        id,
        name,
        content,
        createdAt,
      },
      ...posts,
    ]);
  };

  return (
    <Section className="py-20">
      <div className="w-full max-w-2xl mx-auto space-y-12 md:px-4">
        <h1 className="text-3xl text-center">방명록</h1>
        <div className="space-y-4">
          <PostsContainer className="overflow-x-auto flex w-full space-x-3 h-64 py-4 relative ">
            {posts.map((post) => (
              <SimplePostCard key={post.id} post={post} />
            ))}
          </PostsContainer>
          <div className="flex flex-row justify-end space-x-2 text-sm font-sans">
            <button className="p-1" onClick={handlePostsModalOpen}>
              전체 보기
            </button>
            <button
              className="p-1 font-bold flex-row"
              onClick={handleFormModalOpen}
            >
              글 남기기
            </button>
          </div>
        </div>
      </div>
      <PostFormModal
        isOpen={isFormModalOpen}
        handleClose={handleFormModalClose}
        onFormValid={onFormValid}
      />
      <AllPostsModal
        isOpen={isPostsModalOpen}
        handleClose={handlePostsModalClose}
      />
    </Section>
  );
}

export default GuestBook;

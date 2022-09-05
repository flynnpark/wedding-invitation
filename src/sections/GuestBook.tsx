import dayjs from 'dayjs';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import AllPostsModal from 'components/guestbook/AllPostsModal';
import WriteFormModal from 'components/guestbook/WriteFormModal';
import Section from 'components/Section';
import { db } from 'utils/firebase';

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
  const handlePostsModalClose = () => setIsFormModalOpen(false);

  const fetchData = async () => {
    const dataQuery = query(
      collection(db, 'guestBook'),
      orderBy('createdAt'),
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
          <div className="overflow-x-auto flex w-full space-x-3 h-64 py-4 relative ">
            {posts.map(({ id, name, content, createdAt }) => (
              <div
                key={id}
                className="flex flex-col rounded-xl w-44 max-w-xl bg-stone-100 flex-none text-xs p-4 justify-between shadow-md first:ml-2"
              >
                <div className="overflow-hidden flex-col break-all text-ellipsis leading-5">
                  {content}
                </div>
                <div className="text-right">
                  <h1>- {name}</h1>
                  <span className="text-[.5rem] font-sans">
                    {dayjs(createdAt).format('MM월 DD일 HH:mm')}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
      <WriteFormModal
        isOpen={isFormModalOpen}
        handleClose={handleFormModalClose}
        setIsOpen={setIsFormModalOpen}
        addNewPost={addNewPost}
      />
      <AllPostsModal
        isOpen={isPostsModalOpen}
        handleClose={handlePostsModalClose}
      />
    </Section>
  );
}

export default GuestBook;

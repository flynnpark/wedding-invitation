import dayjs from 'dayjs';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import WriteForm from 'components/guestbook/WriteForm';
import Section from 'components/Section';
import { db } from 'utils/firebase';

export interface Post {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}

function GuestBook() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleModalOpen = () => {
    window.gtag?.('event', 'open_guestbook_form');
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);

  const fetchData = async () => {
    const dataQuery = query(
      collection(db, 'guestBook'),
      orderBy('createdAt'),
      limit(20)
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
        <WriteForm
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          setIsOpen={setIsModalOpen}
          addNewPost={addNewPost}
        />
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
            <button className="p-1">전체 보기</button>
            <button
              className="p-1 font-bold flex-row"
              onClick={handleModalOpen}
            >
              글 남기기
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default GuestBook;

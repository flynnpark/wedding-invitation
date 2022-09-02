import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import WriteForm from 'components/guestbook/WriteForm';
import Section from 'components/Section';
import { db } from 'utils/firebase';

export interface Post {
  id: string;
  name: string;
  content: string;
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
        return { id: doc.id, name, password, content, createdAt };
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNewPost = (id: string, name: string, content: string) => {
    setPosts([
      {
        id,
        name,
        content,
      },
      ...posts,
    ]);
  };

  return (
    <Section>
      <div className="w-full max-w-2xl mx-auto space-y-12 px-4">
        <h1 className="text-3xl text-center">방명록</h1>
        <WriteForm
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          setIsOpen={setIsModalOpen}
          addNewPost={addNewPost}
        />
        <div className="space-y-4">
          <div className="overflow-x-auto flex space-x-3 h-64 py-4 pl-1 relative -left-1">
            {posts.map(({ id, name, content }) => (
              <div
                key={id}
                className="flex flex-col rounded-xl w-44 max-w-xl bg-stone-100 flex-none text-xs p-4 justify-between shadow-md"
              >
                <div className="overflow-hidden flex-col break-all">
                  {content}
                </div>
                <h1 className="text-center">- {name} -</h1>
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

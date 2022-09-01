import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Section from 'components/Section';
import { db } from 'utils/firebase';

interface GuestBookForm {
  name: string;
  password: string;
  content: string;
}

interface Post {
  name: string;
  password: string;
  content: string;
}

function GuestBook() {
  const { register, handleSubmit, reset } = useForm<GuestBookForm>();
  const [posts, setPosts] = useState<Post[]>([]);

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
        return { name, password, content, createdAt };
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onValid = async (data: GuestBookForm) => {
    console.log(data);
    const { name, password, content } = data;
    const docRef = await addDoc(collection(db, 'guestBook'), {
      name,
      password,
      content,
      isDeleted: false,
      createdAt: new Date(),
    });
    reset();
  };

  return (
    <Section>
      <div className="w-full max-w-2xl mx-auto space-y-12 px-8">
        <h1 className="text-3xl text-center">방명록</h1>
        <form className="mt-20" onSubmit={handleSubmit(onValid)}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
          />
          <label htmlFor="name">비밀번호</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
          <div>
            <label htmlFor="name">내용</label>
            <input
              type="text"
              id="content"
              {...register('content', { required: true })}
            />
          </div>
          <div>
            <button type="submit">작성하기</button>
          </div>
        </form>
      </div>
    </Section>
  );
}

export default GuestBook;

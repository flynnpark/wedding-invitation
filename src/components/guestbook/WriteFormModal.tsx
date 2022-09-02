import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { db } from 'utils/firebase';

export interface GuestBookForm {
  name: string;
  password: string;
  content: string;
}

interface WriteFormModalProps {
  isOpen: boolean;
  handleClose: () => void;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  addNewPost: (
    id: string,
    name: string,
    content: string,
    createdAt: Date
  ) => void;
}

function WriteFormModal({
  isOpen,
  handleClose,
  setIsOpen,
  addNewPost,
}: WriteFormModalProps) {
  const { register, handleSubmit, reset } = useForm<GuestBookForm>();

  const onValid = async (data: GuestBookForm) => {
    window.gtag?.('event', 'write_guest_book');
    const { name, password, content } = data;
    const createdAt = new Date();
    const docRef = await addDoc(collection(db, 'guestBook'), {
      name,
      password,
      content,
      isDeleted: false,
      createdAt,
    });
    addNewPost(docRef.id, name, content, createdAt);
    setIsOpen(false);
    toast.info('게시글이 작성되었어요!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      className="bg-white rounded-2xl flex flex-col p-4 w-80"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/[.40] items-center justify-center flex h-full"
    >
      <div className="text-center">
        <h2>방명록 글 작성</h2>
        <hr className="my-4" />
      </div>
      <form className="flex flex-col text-sm" onSubmit={handleSubmit(onValid)}>
        <div className="space-y-4">
          <div className="w-full flex flex-col">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-sans"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              className="bg-stone-200 rounded-xl px-2 py-1"
            />
          </div>
          <div className="w-full flex flex-col">
            <div>
              <label
                htmlFor="name"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 font-sans"
              >
                비밀번호
                <span className="inline-block ml-2 font-medium text-gray-400">
                  글 수정, 삭제만을 위해 사용되는 비밀번호
                </span>
              </label>
            </div>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
              className="bg-stone-200 rounded-xl px-2 py-1"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold font-sans"
            >
              내용
            </label>
            <textarea
              id="content"
              rows={5}
              {...register('content', { required: true })}
              className="bg-stone-200 rounded-xl px-2 py-1"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-2 justify-center mt-4">
          <button
            type="submit"
            className="flex bg-stone-600  py-2 rounded-md justify-center text-sm w-24 text-white"
          >
            작성하기
          </button>
          <button
            className="flex bg-stone-300  py-2 rounded-md justify-center text-sm w-24"
            onClick={handleClose}
          >
            닫기
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default WriteFormModal;

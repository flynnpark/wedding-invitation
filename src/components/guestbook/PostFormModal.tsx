import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import styled from 'styled-components';

import { Post } from 'sections/GuestBook';
import classnames from 'utils/classnames';

const TextArea = styled.textarea`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: #ccc;
  }
`;

export interface GuestBookPostForm {
  id?: string;
  name: string;
  password: string;
  content: string;
}

export type FormType = 'new' | 'edit' | 'delete';

interface WriteFormModalProps {
  type?: FormType;
  isOpen: boolean;
  handleClose: () => void;
  onFormValid: (data: GuestBookPostForm) => Promise<boolean> | boolean;
  post?: Post;
}

function PostFormModal({
  type = 'new',
  isOpen,
  handleClose,
  onFormValid,
  post,
}: WriteFormModalProps) {
  const { register, handleSubmit, reset } = useForm<GuestBookPostForm>();

  const onValid = async (data: GuestBookPostForm) => {
    const isSuccess = await onFormValid(data);
    if (isSuccess) {
      reset();
    }
  };

  const getSubmitButtonText = () => {
    if (type === 'edit') {
      return '수정하기';
    } else if (type === 'delete') {
      return '삭제하기';
    }
    return '작성하기';
  };

  const handleModalClose = () => {
    reset();
    handleClose();
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
              {...register('name', {
                required: true,
                disabled: type === 'delete',
              })}
              className={classnames(
                'rounded-xl px-2 py-1',
                type === 'delete' ? 'bg-zinc-400' : 'bg-stone-200'
              )}
              value={post?.name}
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
              className={'rounded-xl px-2 py-1 bg-stone-200'}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold font-sans"
            >
              내용
            </label>
            <TextArea
              id="content"
              rows={10}
              {...register('content', {
                required: true,
                disabled: type === 'delete',
              })}
              className={classnames(
                'rounded-xl px-2 py-1',
                type === 'delete' ? 'bg-zinc-400' : 'bg-stone-200'
              )}
              value={post?.content}
            />
          </div>
          <input
            type="hidden"
            {...register('id', {
              value: post?.id,
            })}
          />
        </div>
        <div className="flex flex-row space-x-2 justify-center mt-4">
          <button
            type="submit"
            className="flex bg-stone-600  py-2 rounded-md justify-center text-sm w-24 text-white"
          >
            {getSubmitButtonText()}
          </button>
          <button
            className="flex bg-stone-300  py-2 rounded-md justify-center text-sm w-24"
            onClick={handleModalClose}
          >
            닫기
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PostFormModal;

import React from 'react';
import Modal from 'react-modal';

export interface AccountInfo {
  title: string;
  bank: string;
  account: string;
  name: string;
}

interface AccountModalProps extends AccountInfo {
  isOpen: boolean;
  handleClose: () => void;
}

function AccountModal({
  isOpen,
  handleClose,
  title,
  bank,
  account,
  name,
}: AccountModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      className="bg-white rounded-2xl flex flex-col p-4 w-80 text-center"
      overlayClassName="absolute top-0 left-0 right-0 bottom-0 bg-black/[.40] items-center justify-center flex h-full"
    >
      <div>
        <h2>{title}</h2>
        <hr className="my-4" />
      </div>
      <div className="space-y-1 mb-4">
        <h1>{bank}</h1>
        <h2>{account}</h2>
        <h2>예금주: {name}</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="flex bg-stone-300  py-2 rounded-md justify-center text-sm">
          복사하기
        </button>
        <button
          className="flex bg-stone-600  py-2 rounded-md justify-center text-sm text-white"
          onClick={handleClose}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}

export default AccountModal;

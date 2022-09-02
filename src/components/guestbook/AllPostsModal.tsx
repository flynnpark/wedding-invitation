import React from 'react';
import Modal from 'react-modal';

interface AllPostsModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function AllPostsModal({ isOpen, handleClose }: AllPostsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      className="bg-white rounded-2xl flex flex-col p-4 w-80 text-center"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/[.40] items-center justify-center flex h-full"
    >
      <div className="text-center">
        <h2>모든 게시글</h2>
        <hr className="my-4" />
        <div className=""></div>
      </div>
    </Modal>
  );
}

export default AllPostsModal;

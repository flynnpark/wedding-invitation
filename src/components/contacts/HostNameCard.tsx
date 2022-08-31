import React, { useState } from 'react';

import Money from 'components/icons/Money';
import Phone from 'components/icons/Phone';
import AccountModal, { AccountInfo } from './AccountModal';

interface HostNameCardProps {
  father: string;
  mother: string;
  phone: string;
  accountInfo: AccountInfo;
}

function HostNameCard({
  father,
  mother,
  phone,
  accountInfo,
}: HostNameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModelOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <AccountModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        {...accountInfo}
      />
      <div className="space-y-2">
        <h1>
          <span>아버지</span> <span className="font-bold">{father}</span>
        </h1>
        <h1>
          <span>어머니</span> <span className="font-bold">{mother}</span>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-1 mt-4">
        <a className="p-2 bg-stone-200 rounded-full" href={`tel:+82${phone}`}>
          <Phone />
        </a>
        <button
          className="p-2 bg-stone-200 rounded-full"
          onClick={handleModelOpen}
        >
          <Money />
        </button>
      </div>
    </div>
  );
}

export default HostNameCard;

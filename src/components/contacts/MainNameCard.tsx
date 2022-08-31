import React, { useState } from 'react';

import Messenger from 'components/icons/Messenger';
import Money from 'components/icons/Money';
import KakaoPay from '../icons/KakaoPay';
import Toss from '../icons/Toss';
import AccountModal, { AccountInfo } from './AccountModal';
import PayButton from './PayButton';

interface MainNameCardProps {
  modifier: string;
  name: string;
  kakaoUrl: string;
  kakaoPayUrl: string;
  tossUrl: string;
  accountInfo: AccountInfo;
}

function MainNameCard({
  modifier,
  name,
  kakaoUrl,
  kakaoPayUrl,
  tossUrl,
  accountInfo,
}: MainNameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    window.gtag?.('event', 'click_account', { target: name });
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <AccountModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        {...accountInfo}
      />
      <h1 className="text-xl">
        <span>{modifier}</span> <span className="font-bold">{name}</span>
      </h1>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="flex flex-col space-y-2 items-end">
          <a
            className="p-2 bg-stone-200 rounded-full"
            href={kakaoUrl}
            onClick={() =>
              window.gtag?.('event', 'click_kakaotalk', { target: name })
            }
          >
            <Messenger />
          </a>
          <PayButton
            url={kakaoPayUrl}
            onClick={() =>
              window.gtag?.('event', 'click_kakaopay', { target: name })
            }
          >
            <KakaoPay />
          </PayButton>
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <button
            className="p-2 bg-stone-200 rounded-full"
            onClick={handleModalOpen}
          >
            <Money />
          </button>
          <PayButton
            url={tossUrl}
            onClick={() =>
              window.gtag?.('event', 'click_toss', { target: name })
            }
          >
            <Toss />
          </PayButton>
        </div>
      </div>
      <div className="flex items-center space-x-1"></div>
      <div className="flex space-x-1 items-center"></div>
    </div>
  );
}

export default MainNameCard;

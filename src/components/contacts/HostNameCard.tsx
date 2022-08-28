import React from 'react';

import Money from 'components/icons/Money';
import Phone from 'components/icons/Phone';

interface HostNameCardProps {
  father: string;
  mother: string;
}

function HostNameCard({ father, mother }: HostNameCardProps) {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="space-y-2">
        <h1>
          <span>아버지</span> <span className="font-bold">{father}</span>
        </h1>
        <h1>
          <span>어머니</span> <span className="font-bold">{mother}</span>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-1 mt-4">
        <button className="p-2 bg-stone-200 rounded-full">
          <Phone />
        </button>
        <button className="p-2 bg-stone-200 rounded-full">
          <Money />
        </button>
      </div>
    </div>
  );
}

export default HostNameCard;

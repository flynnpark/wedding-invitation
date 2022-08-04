import React from 'react';

interface HostNameCardProps {
  modifier: string;
  name: string;
}

function HostNameCard({ modifier, name }: HostNameCardProps) {
  return (
    <div className="flex w-full justify-center items-center">
      <h1>
        <span>{modifier}</span> {name}
      </h1>
    </div>
  );
}

export default HostNameCard;

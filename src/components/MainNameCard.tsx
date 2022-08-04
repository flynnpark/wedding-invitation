import React from 'react';

interface MainNameCardProps {
  modifier: string;
  name: string;
}

function MainNameCard({ modifier, name }: MainNameCardProps) {
  return (
    <div className="flex w-full justify-center items-center">
      <h1>
        <span>{modifier}</span> {name}
      </h1>
    </div>
  );
}

export default MainNameCard;

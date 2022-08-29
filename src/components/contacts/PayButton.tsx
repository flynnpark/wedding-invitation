import React from 'react';

interface PayButtonProps {
  children: React.ReactNode;
  url: string;
}

function PayButton({ children, url }: PayButtonProps) {
  return (
    <a
      className="rounded-full bg-stone-200 px-[0.6rem] py-[0.4rem] items-center justify-center"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default PayButton;

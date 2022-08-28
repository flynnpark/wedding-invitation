import React from 'react';

interface PayButtonProps {
  children: React.ReactNode;
}

function PayButton({ children }: PayButtonProps) {
  return (
    <button className="rounded-full bg-stone-200 px-[0.6rem] py-[0.4rem] items-center justify-center">
      {children}
    </button>
  );
}

export default PayButton;

import React from 'react';

interface RootProps {
  children: React.ReactNode;
}

function Root({ children }: RootProps) {
  return (
    <div className="overflow-auto w-full max-w-xl mx-auto h-screen">
      {children}
    </div>
  );
}

export default Root;

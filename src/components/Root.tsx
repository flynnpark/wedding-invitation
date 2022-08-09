import React from 'react';

interface RootProps {
  children: React.ReactNode;
}

function Root({ children }: RootProps) {
  return (
    <div className="overflow-auto w-full h-screen text-gray-800 space-y-32">
      {children}
    </div>
  );
}

export default Root;

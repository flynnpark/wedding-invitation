import React from 'react';

interface HostTitleProps {
  modifier: string;
}

function HostTitle({ modifier }: HostTitleProps) {
  return (
    <h1 className="text-center text-xl underline underline-offset-8 decoration-1">
      {modifier}측 혼주
    </h1>
  );
}

export default HostTitle;

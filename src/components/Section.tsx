import React from 'react';

import classnames from 'utils/classnames';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

function Section({ children, className }: SectionProps) {
  return (
    <div className={classnames('w-full flex flex-col', className || '')}>
      {children}
    </div>
  );
}

export default Section;

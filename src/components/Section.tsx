import React from 'react';
interface SectionProps {
  children: React.ReactNode;
}

function Section({ children }: SectionProps) {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
}

export default Section;

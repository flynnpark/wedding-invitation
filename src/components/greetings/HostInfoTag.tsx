import React from 'react';

interface HostInfoTagProps {
  fatherName: string;
  motherName: string;
  prefix: string;
  mainName: string;
}

function HostInfoTag({
  fatherName,
  motherName,
  prefix,
  mainName,
}: HostInfoTagProps) {
  return (
    <p className="text-center inline-flex items-baseline">
      <span className="text-xl font-semibold">
        {fatherName} · {motherName}
      </span>
      <span className="text-[1.0rem] text-left w-16 ml-1">의 {prefix}</span>{' '}
      <span className="text-xl font-semibold ml-2">{mainName}</span>
    </p>
  );
}

export default HostInfoTag;

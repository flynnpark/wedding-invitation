import React, { useEffect, useRef, useState } from 'react';

interface RootProps {
  children: React.ReactNode;
}

function Root({ children }: RootProps) {
  const DIVIDER_HEIGHT = 5;
  const actionRef = useRef<boolean>(true);
  const pageRef = useRef<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      // 스크롤 행동 구현
      if (rootRef.current && actionRef.current) {
        const { deltaY } = e;
        const { scrollTop } = rootRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

        actionRef.current = false;
        if (deltaY > 0) {
          if (
            scrollTop >= pageHeight * pageRef.current &&
            scrollTop <= pageHeight * (pageRef.current + 1)
          ) {
            rootRef.current.scrollTo({
              top: pageHeight * (pageRef.current + 1),
              left: 0,
              behavior: 'smooth',
            });
            pageRef.current += 1;
          }
        } else {
          if (
            scrollTop >= pageHeight * pageRef.current &&
            scrollTop <= pageHeight * (pageRef.current + 1)
          ) {
            rootRef.current.scrollTo({
              top: pageHeight * (pageRef.current - 1),
              left: 0,
              behavior: 'smooth',
            });
            pageRef.current -= 1;
          }
        }
        actionRef.current = true;
      }
    };

    if (rootRef.current) {
      rootRef.current.addEventListener('wheel', wheelHandler);
    }

    return () => {
      if (rootRef.current) {
        rootRef.current.removeEventListener('wheel', wheelHandler);
      }
    };
  }, []);

  return (
    <div className="h-screen overflow-auto" ref={rootRef}>
      {children}
    </div>
  );
}

export default Root;

import React from 'react';

import Section from 'components/Section';

function WayToCome() {
  // 지도에 표시할 위치의 위도와 경도 설정

  return (
    <Section>
      <div className="max-w-xl mx-auto w-full">
        <div className="mt-20 text-center space-y-3">
          <h1 className="text-3xl">문경관광호텔 무궁화홀</h1>
          <h2>경북 문경시 문경읍 새재2길 32-3</h2>
        </div>
        <div className="my-8 flex items-center justify-center flex-col">
          <h1>오시는 길</h1>
          <div id="naverMap" className="w-full h-40" />
        </div>
      </div>
    </Section>
  );
}

export default WayToCome;

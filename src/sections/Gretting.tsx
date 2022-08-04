import React from 'react';

import Section from 'components/Section';

function Greeting() {
  return (
    <Section className="space-y-8">
      <div className="flex items-center justify-center flex-col">
        <p>인삿말 채워넣을 곳</p>
      </div>
      <div className="flex items-center justify-center flex-col">
        <p>박용환 · 송미애의 장남 박인호</p>
        <p>박상현 · 천연심의 장녀 박아름</p>
      </div>
      <div className="flex items-center justify-center">
        <p>2022. 10. 15. 토요일 오후 1시</p>
        <p>문경관광호텔 무궁화홀</p>
      </div>
    </Section>
  );
}

export default Greeting;

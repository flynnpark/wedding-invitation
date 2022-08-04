import React from 'react';

import Section from 'components/Section';

function Greeting() {
  return (
    <Section>
      <div className="my-8 flex items-center justify-center flex-col">
        <p>인삿말 채워넣을 곳</p>
      </div>
      <div className="my-8 flex items-center justify-center flex-col">
        <p>박용환 · 송미애의 장남 박인호</p>
        <p>ㅁㅁㅁ · ㅁㅁㅁ의 장녀 박아름</p>
      </div>
    </Section>
  );
}

export default Greeting;

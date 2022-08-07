import React from 'react';

import HostInfoTag from 'components/greetings/HostInfoTag';
import Section from 'components/Section';

function Greeting() {
  return (
    <Section className="flex items-center justify-center flex-col text-center space-y-10">
      <div>
        <p className="text-base">
          저희 두 사람,
          <br />
          선선한 바람에 사랑이 묻어나는 계절인 올가을에
          <br />
          소중한 분들을 모시고 사랑의 결실을 이루려 합니다.
          <br />
          따뜻한 마음으로 축복해주신다면
          <br />더 없는 큰 기쁨으로 간직하겠습니다.
        </p>
      </div>
      <div className="flex flex-col">
        <HostInfoTag
          fatherName="박용환"
          motherName="송미애"
          prefix="아들"
          mainName="박인호"
        />
        <HostInfoTag
          fatherName="박상현"
          motherName="천연심"
          prefix="딸"
          mainName="박아름"
        />
      </div>
      <div className="space-y-2">
        <h2>2022년 10월 15일 토요일 오후 1시</h2>
        <h1 className="font-bold text-xl">문경관광호텔 무궁화홀</h1>
      </div>
    </Section>
  );
}

export default Greeting;

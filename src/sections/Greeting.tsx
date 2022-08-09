import React from 'react';

import HostInfoTag from 'components/greetings/HostInfoTag';
import Section from 'components/Section';

function Greeting() {
  return (
    <Section className="flex items-center justify-center flex-col text-center mt-32 bg-stone-100 pt-14 pb-16">
      <div className="w-full relative after:content-[''] after:block after:absolute after:left-1/2 after:bottom-0 after:w-[1px] after:h-20 after:bg-slate-200 pb-32">
        <p className="leading-10 md:leading-[3.0rem] text-base md:text-xl space-y-2 lg:space-y-4 block">
          저희 두 사람,
          <br />
          선선한 바람에 사랑이 묻어나는 계절인 올가을에
          <br />
          소중한 분들을 모시고
          <br />
          사랑의 결실을 이루려 합니다.
          <br />
          따뜻한 마음으로 축복해주신다면
          <br />더 없는 큰 기쁨으로 간직하겠습니다.
        </p>
      </div>
      <div className="flex flex-col space-y-2 mt-12">
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
      <div className="space-y-2 mt-12">
        <h2>2022년 10월 15일 토요일 오후 1시</h2>
        <h1 className="font-bold text-xl">문경관광호텔 무궁화홀</h1>
      </div>
    </Section>
  );
}

export default Greeting;

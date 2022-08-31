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
          mainName="인호"
        />
        <HostInfoTag
          fatherName="박상현"
          motherName="천연심"
          prefix="딸"
          mainName="아름"
        />
      </div>
      <div className="space-y-2 mt-12">
        <h2>2022년 10월 15일 토요일 오후 1시</h2>
        <h1 className="font-bold text-xl">문경관광호텔 무궁화홀</h1>
        <a
          href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=20221015T040000Z/20221015T060000Z&location=%EB%AC%B8%EA%B2%BD%EA%B4%80%EA%B4%91%ED%98%B8%ED%85%94,%20%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EB%AC%B8%EA%B2%BD%EC%8B%9C%20%EB%AC%B8%EA%B2%BD%EC%9D%8D%20%EC%83%88%EC%9E%AC2%EA%B8%B8%2032-11&text=%EC%9D%B8%ED%98%B8+%26+%EC%95%84%EB%A6%84+%EA%B2%B0%ED%98%BC%EC%8B%9D"
          title="Save the date for the wedding"
          target="_blank"
          rel="noreferrer"
          onClick={() => window.gtag?.('event', 'add_to_calendar')}
          className="inline-block rounded-full bg-stone-200 px-[0.6rem] py-[0.4rem] items-center justify-center text-xs"
        >
          캘린더에 추가하기
        </a>
      </div>
    </Section>
  );
}

export default Greeting;

import { StaticImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import Swap from 'components/icons/Swap';
import Section from 'components/Section';

function Home() {
  const [primary, setPrimary] = useState<boolean>(
    Math.floor(Math.random() * 2) === 1 ? true : false
  );

  return (
    <Section>
      <div className="block items-center justify-center max-w-xl mx-auto w-full relative lg:mt-10">
        <div className="absolute left-1/2 top-16 md:top-32 text-center -translate-x-1/2 w-full z-10">
          <a
            href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=20221015T040000Z/20221015T060000Z&location=%EB%AC%B8%EA%B2%BD%EA%B4%80%EA%B4%91%ED%98%B8%ED%85%94,%20%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EB%AC%B8%EA%B2%BD%EC%8B%9C%20%EB%AC%B8%EA%B2%BD%EC%9D%8D%20%EC%83%88%EC%9E%AC2%EA%B8%B8%2032-11&text=%EC%9D%B8%ED%98%B8+%26+%EC%95%84%EB%A6%84+%EA%B2%B0%ED%98%BC%EC%8B%9D"
            title="Save the date for the wedding"
            target="_blank"
            rel="noreferrer"
            onClick={() => window.gtag?.('event', 'add_to_calendar')}
          >
            <h1 className="text-base text-white underline underline-offset-2 decoration-1 shadow-black drop-shadow-[0_3px_3px_rgba(0,0,0,8)]">
              Save the date for the wedding
            </h1>
          </a>
          <span className="text-gray-900 font-medium bg-white bg-opacity-70 py-2 px-4 text-3xl md:text-2xl inline-block mt-2">
            {primary ? (
              <>
                인호 <span className="text-xl">&</span> 아름
              </>
            ) : (
              <>
                아름 <span className="text-xl">&</span> 인호
              </>
            )}
          </span>
        </div>
        <div className="absolute left-4 right-4 top-4 bottom-0 content-[''] block border-[1px] border-gray-200"></div>
        <div className="relative">
          {primary ? (
            <StaticImage
              src="../images/main1.jpg"
              alt="메인 이미지"
              className="-z-10"
            />
          ) : (
            <StaticImage
              src="../images/main2.jpg"
              alt="메인 이미지"
              className="-z-10"
            />
          )}
          <button
            className="absolute right-6 bottom-2 text-white bg-white/[.4] rounded-full p-1"
            onClick={() => {
              window.gtag?.('event', 'change_main');
              setPrimary(!primary);
            }}
          >
            <Swap />
          </button>
        </div>
        <div className="mx-4 mb-14 mt-12">
          <h1 className="text-center text-xl">2022. 10. 15. SAT PM 1:00</h1>
          <h2 className="text-center text-xl">문경관광호텔 무궁화홀</h2>
        </div>
      </div>
    </Section>
  );
}

export default Home;

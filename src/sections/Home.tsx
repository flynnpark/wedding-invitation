import React from 'react';

import Section from 'components/Section';
import main from 'images/main.png';

function Home() {
  return (
    <Section>
      <div className="block items-center justify-center max-w-xl mx-auto w-full relative mt-16">
        <div className="absolute left-1/2 top-16 md:top-32 text-center -translate-x-1/2 w-full">
          <h1 className="text-base text-white underline underline-offset-2 decoration-1 shadow-black drop-shadow-[0_3px_3px_rgba(0,0,0,8)]">
            Save the date for the wedding
          </h1>
          <span className="text-gray-900 font-medium bg-white bg-opacity-70 py-2 px-4 text-3xl md:text-2xl inline-block mt-2">
            박인호 <span className="text-xl">&</span> 박아름
          </span>
        </div>
        <div className="absolute left-4 right-4 top-4 bottom-0 content-[''] block border-[1px] border-gray-200"></div>
        <img src={main} alt="메인 이미지" />
        <div className="mx-4 my-14">
          <h1 className="text-center text-xl">2022. 10. 15. SAT PM 1:00</h1>
          <h2 className="text-center text-xl">문경관광호텔 무궁화홀</h2>
        </div>
      </div>
    </Section>
  );
}

export default Home;

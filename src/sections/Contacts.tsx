import React from 'react';

import HostNameCard from 'components/contacts/HostNameCard';
import HostTitle from 'components/contacts/HostTitle';
import MainNameCard from 'components/contacts/MainNameCard';
import Section from 'components/Section';

function Contacts() {
  return (
    <Section>
      <div className="w-full max-w-2xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl text-center">마음 전하실 곳</h1>
          <div className="flex flex-row mt-20">
            <MainNameCard
              modifier="신랑"
              name="박인호"
              kakaoUrl="https://open.kakao.com/o/ssJepsye"
              kakaoPayUrl="https://qr.kakaopay.com/Ej72yoJRT"
              tossUrl="https://toss.me/flynnpark"
            />
            <MainNameCard
              modifier="신부"
              name="박아름"
              kakaoUrl=""
              kakaoPayUrl=""
              tossUrl=""
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex-col w-full">
            <HostTitle modifier="신랑" />
            <div className="mt-8 space-y-6">
              <HostNameCard father="박용환" mother="송미애" />
            </div>
          </div>
          <div className="flex-col w-full">
            <HostTitle modifier="신부" />
            <div className="mt-8 space-y-6">
              <HostNameCard father="박상현" mother="천연심" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contacts;

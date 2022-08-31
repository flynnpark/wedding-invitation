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
              accountInfo={{
                title: '신랑',
                bank: '토스뱅크',
                account: '1000-0036-7988',
                name: '박인호',
              }}
            />
            <MainNameCard
              modifier="신부"
              name="박아름"
              kakaoUrl=""
              kakaoPayUrl="https://qr.kakaopay.com/Ej8fAZQcN"
              tossUrl="https://toss.me/amiepark"
              accountInfo={{
                title: '신부',
                bank: '카카오뱅크',
                account: '3333-03-2537563',
                name: '박아름',
              }}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex-col w-full">
            <HostTitle modifier="신랑" />
            <div className="mt-8 space-y-6">
              <HostNameCard
                father="박용환"
                mother="송미애"
                phone="01050920194"
                accountInfo={{
                  title: '신랑측 아버지',
                  bank: '농축협',
                  account: '745107-52-052848',
                  name: '박용환',
                }}
              />
            </div>
          </div>
          <div className="flex-col w-full">
            <HostTitle modifier="신부" />
            <div className="mt-8 space-y-6">
              <HostNameCard
                father="박상현"
                mother="천연심"
                phone=""
                accountInfo={{
                  title: '신부측 어머니',
                  bank: '카카오뱅크',
                  account: '3333-23-4078901',
                  name: '천연심',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contacts;

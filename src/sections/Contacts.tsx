import React from 'react';

import HostNameCard from 'components/HostNameCard';
import MainNameCard from 'components/MainNameCard';
import Section from 'components/Section';

function Contacts() {
  return (
    <Section>
      <div>
        <div>
          <h1 className="text-lg text-center">마음 전하실 곳</h1>
          <div className="flex flex-row">
            <MainNameCard modifier="신랑" name="박인호" />
            <MainNameCard modifier="신부" name="박아름" />
          </div>
        </div>
        <div>
          <h1 className="text-lg text-center">혼주에게 연락하기</h1>
          <div className="flex flex-row">
            <div className="flex-col w-full">
              <h1 className="text-center">신랑측 혼주</h1>
              <HostNameCard modifier="아버지" name="박용환" />
              <HostNameCard modifier="어머니" name="송미애" />
            </div>
            <div className="flex-col w-full">
              <h1 className="text-center">신부측 혼주</h1>
              <HostNameCard modifier="아버지" name="박상현" />
              <HostNameCard modifier="어머니" name="천연심" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Contacts;

import React from 'react';

import Root from 'components/Root';
import Contacts from 'sections/Contacts';
import Gallary from 'sections/Gallary';
import Greeting from 'sections/Greeting';
import GuestBook from 'sections/GuestBook';
import Home from 'sections/Home';
import WayToCome from 'sections/WayToCome';

function IndexPage() {
  return (
    <Root>
      {/* <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.GATSBY_NCP_ID}`}
        strategy="idle"
      /> */}
      <Home />
      <Greeting />
      <WayToCome />
      <Gallary />
      <GuestBook />
      <Contacts />
    </Root>
  );
}

export default IndexPage;

export function Head() {
  return (
    <>
      <title>Flynn and Amie's wedding invitation!</title>
    </>
  );
}

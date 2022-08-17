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
      <script
        type="text/javascript"
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=b4x0m503v8"
      ></script>
    </>
  );
}

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

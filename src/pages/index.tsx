import React from 'react';

import Root from 'components/Root';
import Account from 'sections/Account';
import Calendar from 'sections/Calendar';
import Contacts from 'sections/Contacts';
import Gallary from 'sections/Gallary';
import Greeting from 'sections/Gretting';
import GuestBook from 'sections/GuestBook';
import Home from 'sections/Home';
import WayToCome from 'sections/WayToCome';

function IndexPage() {
  return (
    <Root>
      <Home />
      <Greeting />
      <Gallary />
      <Contacts />
      <Calendar />
      <WayToCome />
      <Account />
      <GuestBook />
    </Root>
  );
}

export default IndexPage;

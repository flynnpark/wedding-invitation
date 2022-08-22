import React, { useEffect } from 'react';

import Root from 'components/Root';
import Contacts from 'sections/Contacts';
import Gallery from 'sections/Gallery';
import Greeting from 'sections/Greeting';
import GuestBook from 'sections/GuestBook';
import Home from 'sections/Home';
import WayToCome from 'sections/WayToCome';

function IndexPage() {
  useEffect(() => {
    const listener = function () {
      window.scrollTo(0, 1);
    };
    window.addEventListener('load', listener);

    return () => {
      window.removeEventListener('load', listener);
    };
  }, []);

  return (
    <Root>
      <Home />
      <Greeting />
      <WayToCome />
      <Gallery />
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
      <meta name="theme-color" content="#fafaf9"></meta>
    </>
  );
}

import React, { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import Root from 'components/Root';
import Contacts from 'sections/Contacts';
import Copyright from 'sections/Copyright';
import Gallery from 'sections/Gallery';
import Greeting from 'sections/Greeting';
import Home from 'sections/Home';
import WayToCome from 'sections/WayToCome';

import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    border-radius: 0.75rem;
    min-height: auto;
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0.25rem 0;
  }
  .Toastify__progress-bar {
  }
  button[aria-label='close'] {
    display: none;
  }
`;

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
    <>
      <Root>
        <Home />
        <Greeting />
        <Gallery />
        <WayToCome />
        {/* <GuestBook /> */}
        <Contacts />
        <Copyright />
      </Root>
      <StyledContainer transition={Slide} />
    </>
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

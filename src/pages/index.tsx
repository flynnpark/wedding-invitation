import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Slide, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import Root from 'components/Root';
import Contacts from 'sections/Contacts';
import Copyright from 'sections/Copyright';
import Gallery from 'sections/Gallery';
import Greeting from 'sections/Greeting';
import GuestBook from 'sections/GuestBook';
import Home from 'sections/Home';
import WayToCome from 'sections/WayToCome';
import Main from '../images/main1.jpg';

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
        <Contacts />
        <GuestBook />
        <Copyright />
      </Root>
      <StyledContainer
        transition={Slide}
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </>
  );
}

Modal.setAppElement('#___gatsby');

export default IndexPage;

export function Head() {
  return (
    <>
      <title>인호 & 아름, 결혼합니다!</title>
      <meta name="theme-color" content="#fafaf9"></meta>
      <meta property="og:url" content="https://flynn-n-amie.netlify.com/" />
      <meta property="og:title" content="인호 & 아름, 결혼합니다!" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`https://flynn-n-amie.netlify.com${Main}`}
      />
      <meta
        property="og:description"
        content="2022년 10월 15일 오후 1시 문경관광호텔"
      />
    </>
  );
}

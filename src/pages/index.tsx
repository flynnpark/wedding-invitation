import React from 'react';
import Root from 'components/Root';
import Section from 'components/Section';
import Home from 'sections/Home';

function IndexPage() {
  return (
    <Root>
      <Home />
      <Section>Page 2</Section>
      <Section>Page 3</Section>
      <Section>Page 4</Section>
      <Section>Page 5</Section>
      <Section>Page 6</Section>
      <Section>Page 7</Section>
      <Section>Page 8</Section>
    </Root>
  );
}

export default IndexPage;

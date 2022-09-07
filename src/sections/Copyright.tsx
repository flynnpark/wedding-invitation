import React from 'react';

import Github from 'components/icons/Github';
import Section from 'components/Section';
import { trackEvent } from 'utils/gtag';

function Copyright() {
  return (
    <Section className="bg-stone-300 py-4">
      <div className="max-w-xl w-full mx-auto flex flex-row space-x-2 text-sm justify-center items-center">
        <span className="flex">제작</span>{' '}
        <span className="flex font-bold">박인호(Flynn)</span>
        <a
          className="text-gray-400"
          href="https://github.com/flynnpark"
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('click_github')}
        >
          <Github />
        </a>
      </div>
    </Section>
  );
}

export default Copyright;

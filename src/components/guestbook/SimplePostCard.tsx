import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Post } from 'sections/GuestBook';

const ContentContainer = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

interface SimplePostCardProps {
  post: Post;
}

function SimplePostCard({
  post: { content, name, createdAt },
}: SimplePostCardProps) {
  return (
    <div className="flex flex-col rounded-xl w-44 max-w-xl bg-stone-100 flex-none text-xs p-4 justify-between shadow-md first:ml-2">
      <ContentContainer className="overflow-hidden flex-col break-all text-ellipsis leading-5">
        {content.split('\\n').map((text) => (
          <Fragment key={text}>
            {text}
            <br />
          </Fragment>
        ))}
      </ContentContainer>
      <div className="text-right">
        <h1>- {name}</h1>
        <span className="text-[.5rem] font-sans">
          {dayjs(createdAt).format('MM월 DD일 HH:mm')}
        </span>
      </div>
    </div>
  );
}

export default SimplePostCard;

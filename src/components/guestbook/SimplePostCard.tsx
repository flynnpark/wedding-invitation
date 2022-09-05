import dayjs from 'dayjs';
import React from 'react';

import { Post } from 'sections/GuestBook';

interface SimplePostCardProps {
  post: Post;
}

function SimplePostCard({
  post: { content, name, createdAt },
}: SimplePostCardProps) {
  return (
    <div className="flex flex-col rounded-xl w-44 max-w-xl bg-stone-100 flex-none text-xs p-4 justify-between shadow-md first:ml-2">
      <div className="overflow-hidden flex-col break-all text-ellipsis leading-5">
        {content}
      </div>
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

import React from 'react';

import classnames from 'utils/classnames';

function Calendar() {
  return (
    <div>
      <h1>10월 15일</h1>
      <h2>토요일 오후 1시</h2>
      <div className="grid grid-cols-7 grid-rows-1 text-center text-xl gap-x-4 gap-y-2">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
          <div className="text-sm">{day}</div>
        ))}

        {Array.from(Array(6).keys()).map(() => (
          <div></div>
        ))}
        {Array.from(Array(31).keys()).map((i) =>
          i === 14 ? (
            <div className="font-bold text-white rounded-full bg-gray-700 p-[0.125rem]">
              {i + 1}
            </div>
          ) : (
            <div
              className={classnames(
                'p-[0.125rem]',
                i % 7 === 1 ? 'text-red-400' : ''
              )}
            >
              {i + 1}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Calendar;

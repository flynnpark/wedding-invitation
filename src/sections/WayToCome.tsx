import axios from 'axios';
import React from 'react';
import useSWR from 'swr';

import Section from 'components/Section';
import map from 'images/map.png';

interface NaverMapAPIError {
  error: {
    errorCode: string;
    message: string;
  };
}

const fetcher = (url: string, params: object) =>
  axios
    .get(url, {
      params,
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.GATSBY_NCP_ID!,
        'X-NCP-APIGW-API-KEY': process.env.GATSBY_NCP_KEY!,
      },
    })
    .then((res) => res.data);

function WayToCome() {
  const { data, error } = useSWR<Blob, NaverMapAPIError>(
    'https://naveropenapi.apigw.ntruss.com/map-static/v2/raster',
    (url) =>
      fetcher(url, {
        w: 1920,
        h: 1000,
        center: '128.0783264,36.7610454',
        level: 16,
      })
  );

  console.log(error);

  return (
    <Section>
      <div className="max-w-xl mx-auto w-full">
        <div className="mt-20 text-center space-y-3">
          <h1 className="text-3xl">문경관광호텔 무궁화홀</h1>
          <h2>경북 문경시 문경읍 새재2길 32-3</h2>
        </div>
        <div className="my-8 flex items-center justify-center flex-col">
          <h1>오시는 길</h1>
          <img
            src={data ? `data:image/png;base64,${data}` : map}
            alt="오시는 길"
            className="object-none"
          />
        </div>
      </div>
    </Section>
  );
}

export default WayToCome;

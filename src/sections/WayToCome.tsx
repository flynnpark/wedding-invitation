import React, { useEffect } from 'react';

import Section from 'components/Section';
import useScript from 'hooks/useScript';

function WayToCome() {
  const status = useScript(
    `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.GATSBY_NCP_ID}`
  );

  const initMap = () => {
    const { naver } = window;
    if (naver) {
      const position = new naver.maps.LatLng(36.7610454, 128.0783264);
      const map = new naver.maps.Map('naverMap', {
        center: position,
        zoom: 17,
      });
      new naver.maps.Marker({
        position,
        map,
      });
    }
  };

  useEffect(() => {
    initMap();
  }, [status]);

  return (
    <Section>
      <div className="max-w-xl mx-auto w-full">
        <div className="mt-20 text-center space-y-3">
          <h1 className="text-3xl">문경관광호텔 무궁화홀</h1>
          <h2>경북 문경시 문경읍 새재2길 32-3</h2>
        </div>
        <div className="my-8 flex items-center justify-center flex-col">
          <h1>오시는 길</h1>
          <div id="naverMap" className="w-full h-80" />
        </div>
      </div>
    </Section>
  );
}

export default WayToCome;

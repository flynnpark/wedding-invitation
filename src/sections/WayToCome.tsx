import React, { useEffect } from 'react';

import Section from 'components/Section';
import useScript from 'hooks/useScript';
import googleMapIcon from 'images/google_map_icon.png';
import kakaoMapIcon from 'images/kakao_map_icon.png';
import naverMapIcon from 'images/naver_map_icon.png';
import tmapIcon from 'images/tmap_icon.png';

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
        <div className="text-center space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto text-stone-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <h1 className="text-3xl">문경관광호텔 무궁화홀</h1>
          <h2>경북 문경시 문경읍 새재2길 32-3</h2>
          <h3>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>{' '}
            (054)571-8001
          </h3>
        </div>
        <div className="my-10 flex items-center justify-center flex-col">
          <div id="naverMap" className="w-full h-80" />
        </div>
        <div className="flex flex-row items-center justify-center space-x-6">
          <a
            href="https://goo.gl/maps/uNP84HFf5gFRj57dA"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-12 h-12 rounded-xl shadow-lg"
              src={googleMapIcon}
              alt="구글 지도"
            />
          </a>
          <a href="https://naver.me/5GyL1wzx" target="_blank" rel="noreferrer">
            <img
              className="w-12 h-12 rounded-xl shadow-lg"
              src={naverMapIcon}
              alt="네이버 지도"
            />
          </a>
          <a href="http://kko.to/D9SAe_fxX" target="_blank" rel="noreferrer">
            <img
              className="w-12 h-12 rounded-xl shadow-lg"
              src={kakaoMapIcon}
              alt="카카오 지도"
            />
          </a>
          <a
            href="https://surl.tmap.co.kr/42454e7e"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-12 h-12 rounded-xl shadow-lg"
              src={tmapIcon}
              alt="티맵 지도"
            />
          </a>
        </div>
      </div>
    </Section>
  );
}

export default WayToCome;

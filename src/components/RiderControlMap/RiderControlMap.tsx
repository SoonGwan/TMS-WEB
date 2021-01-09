/*global kakao*/

import React, { MutableRefObject } from 'react';
import './RiderControlMap.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

const RiderControlMap = () => {
  return (
    <>
      <div className="RiderControlMap">
        <div className="RiderControlMap-DriverStatusListWrapper">
          <div className="RiderControlMap-DriverStatusListWrapper-ListStructure"></div>
        </div>
        <div className="RiderControlMap-Geolocation">
          <div id="map" style={{ width: '70.405vw', height: '100vh' }}></div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RiderControlMap);

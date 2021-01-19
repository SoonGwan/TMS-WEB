/*global kakao*/

import React from 'react';
import './RiderControlMap.scss';
import RiderList from './RiderList/RiderList';
import RiderStatusList from './RiderStatusList';
import { SOCKET_SERVER } from 'config/config.json';
import io from 'socket.io-client';

declare global {
  interface Window {
    kakao: any;
  }
}

const RiderControlMap = () => {
  return (
    <>
      <div className="RiderControlMap">
        {/* <div className="RiderControlMap-DriverStatusListWrapper">
          <RiderStatusList />
          <RiderList />
        </div> */}
        <div className="RiderControlMap-Geolocation">
          <div id="map" style={{ width: '100vw', height: '100vh' }}></div>
        </div>
      </div>
    </>
  );
};

export default React.memo(RiderControlMap);

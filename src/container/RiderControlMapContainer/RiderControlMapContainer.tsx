import React, { useEffect, useState, useCallback, useRef } from 'react';
import RiderControlMap from 'components/RiderControlMap';
import RiderControlMapRepository from 'repository/RiderControlMapRepository';
import { useRecoilState } from 'recoil';
import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import { SOCKET_SERVER } from 'config/config.json';
// const io = require('socket.io-client');

interface ILocation {
  latitude: number;
  longitude: number;
}

const RiderControlMapContainer = () => {
  const { kakao } = window;
  const [, setOriginDriverState] = useRecoilState(DriverDeliveryState);
  const [mapLatitude, setMapLatitude] = useState<number>();
  const [mapLongitude, setMapLongitude] = useState<number>();

  const drawMap = useCallback(async () => {
    const container = document.getElementById('map');

    // 만약 카카오맵 api 가져올거 있으면 여기에 먼저 추가후 사용해주세요
    const {
      LatLng,
      Map,
      MarkerImage,
      Marker,
      MapTypeControl,
      ZoomControl,
      ControlPosition,
    } = kakao.maps;

    const options = {
      center: await new LatLng(mapLatitude, mapLongitude),
      level: 3,
    };

    console.log(options);
    const map = await new Map(container, options);

    /**
     * 맵에 커스텀 마커 추가
     */
    const icon = await new MarkerImage(
      'https://user-images.githubusercontent.com/48983361/104079506-d21a1a80-5266-11eb-8d81-defccb24070d.png',
      new kakao.maps.Size(31, 37)
    );

    const markerPosition = await new LatLng(mapLatitude, mapLongitude);
    console.log(markerPosition);

    const marker = await new Marker({
      position: markerPosition,
      image: icon,
    });
    marker.setMap(map);

    /**
     * 지도 타입 컨트롤 생성
     */

    const mapTypeControl = await new MapTypeControl();

    map.addControl(mapTypeControl, ControlPosition.TOPRIGHT);

    /**
     * 줌 컨트롤 생성
     */

    const zoomControl = await new ZoomControl();
    map.addControl(zoomControl, ControlPosition.RIGHT);
  }, [kakao.maps, mapLatitude, mapLongitude]);

  const getGeolocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      if (data) {
        const { longitude, latitude } = data.coords;
        setMapLatitude(latitude);
        setMapLongitude(longitude);
      }
    });
  }, []);

  const handleGetDriverState = useCallback(async () => {
    const res = await RiderControlMapRepository.getDriversState();
    setOriginDriverState(res);
  }, [setOriginDriverState]);

  //Connection

  useEffect(() => {
    getGeolocation();
    handleGetDriverState();
    drawMap();
  }, [drawMap, getGeolocation, handleGetDriverState]);

  return (
    <>
      <RiderControlMap />
    </>
  );
};

export default RiderControlMapContainer;

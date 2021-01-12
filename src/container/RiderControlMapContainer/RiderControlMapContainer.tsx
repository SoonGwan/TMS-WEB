import React, { useEffect, useState, useCallback, useRef } from 'react';
import RiderControlMap from 'components/RiderControlMap';
import RiderControlMapRepository from 'repository/RiderControlMapRepository';
import { useRecoilState } from 'recoil';
import { DriverDeliveryState } from 'atom/RiderControlMapAtom';

interface ILocation {
  latitude: number;
  longitude: number;
}

const RiderControlMapContainer = () => {
  const { kakao } = window;
  const [, setOriginDriverState] = useRecoilState(DriverDeliveryState);

  const drawMap = useCallback(
    (data: ILocation) => {
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
        center: new LatLng(data.latitude, data.longitude),
        level: 3,
      };
      const map = new Map(container, options);

      /**
       * 맵에 커스텀 마커 추가
       */
      const icon = new MarkerImage(
        'https://user-images.githubusercontent.com/48983361/104079506-d21a1a80-5266-11eb-8d81-defccb24070d.png',
        new kakao.maps.Size(31, 37)
      );

      const markerPosition = new LatLng(data.latitude, data.longitude);

      const marker = new Marker({
        position: markerPosition,
        image: icon,
      });
      marker.setMap(map);

      /**
       * 지도 타입 컨트롤 생성
       */

      const mapTypeControl = new MapTypeControl();

      map.addControl(mapTypeControl, ControlPosition.TOPRIGHT);

      /**
       * 줌 컨트롤 생성
       */

      const zoomControl = new ZoomControl();
      map.addControl(zoomControl, ControlPosition.RIGHT);
    },
    [kakao.maps]
  );

  const getGeolocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      if (data) {
        const { longitude, latitude } = data.coords;
        const location = { latitude, longitude };
        drawMap(location);
      }
    });
  }, [drawMap]);

  const handleGetDriverState = useCallback(async () => {
    const res = await RiderControlMapRepository.getDriversState();
    setOriginDriverState(res);
  }, [setOriginDriverState]);

  useEffect(() => {
    getGeolocation();
    handleGetDriverState();
  }, [getGeolocation, handleGetDriverState]);

  return (
    <>
      <RiderControlMap />
    </>
  );
};

export default RiderControlMapContainer;

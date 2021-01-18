import React, { useEffect, useState, useCallback, useRef } from 'react';
import RiderControlMap from 'components/RiderControlMap';
import RiderControlMapRepository from 'repository/RiderControlMapRepository';
import { useRecoilState } from 'recoil';
import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import { SOCKET_SERVER } from 'config/config.json';
import io from 'socket.io-client';
import DriverSocket from './RiderSingleton';
import { IRiderSocketLocation } from 'interface/RiderControlMap';
import _, { map } from 'underscore';
import { throttle } from 'throttle-debounce';

interface ILocation {
  latitude: number;
  longitude: number;
}

const RiderControlMapContainer = () => {
  const { kakao } = window;
  const [, setOriginDriverState] = useRecoilState(DriverDeliveryState);
  const [mapLatitude, setMapLatitude] = useState<number>();
  const [mapLongitude, setMapLongitude] = useState<number>();
  const [driverLocation, setDriverLocation] = useState<any>([]);
  const [mapLevel, setMapLevel] = useState<number>();
  const [mapCenter, setMapCenter] = useState<any>({});

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

  let location: any = [];

  const handleRiderLocation = useCallback(
    ({ data }: IRiderSocketLocation) => {
      location.push(data);
      const non_duplidated_data = _.uniq(location, 'driverIdx');
      setDriverLocation(non_duplidated_data);
    },
    [location]
  );

  const kakaoMap = useCallback(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(
        mapCenter.Ma || mapLatitude,
        mapCenter.La || mapLongitude
      ),
      level: mapLevel || 6,
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    kakao.maps.event.addListener(
      map,
      'center_changed',
      _.throttle(() => {
        // 지도의  레벨을 얻어옵니다
        const level = map.getLevel();
        setMapLevel(level);
        // 지도의 중심좌표를 얻어옵니다
        const latlng = map.getCenter();
        setMapCenter(latlng);
      }, 500)
    );
    console.log(driverLocation);
  }, [
    driverLocation,
    kakao.maps.LatLng,
    kakao.maps.Map,
    kakao.maps.event,
    mapCenter.La,
    mapCenter.Ma,
    mapLatitude,
    mapLevel,
    mapLongitude,
  ]);

  useEffect(() => {
    getGeolocation();
    handleGetDriverState();
    DriverSocket.getInstance(handleRiderLocation);
  }, [getGeolocation, handleGetDriverState, handleRiderLocation]);

  useEffect(() => {
    kakaoMap();
  }, [kakaoMap]);

  return (
    <>
      <RiderControlMap />
    </>
  );
};

export default RiderControlMapContainer;

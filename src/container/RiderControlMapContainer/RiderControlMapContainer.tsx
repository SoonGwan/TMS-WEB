import React, { useEffect, useState, useCallback } from 'react';
import RiderControlMap from 'components/RiderControlMap';
import markerIMG from 'assets/Logo Shapes 58.png';
interface IObj {
  accuracy?: number;
  altitude?: null;
  altitudeAccuracy?: null;
  heading?: null;
  latitude?: number;
  longitude?: number;
  speed?: null;
  timestamp?: number;
}

interface Idata {
  latitude: number;
  longitude: number;
}

const RiderControlMapContainer = () => {
  const { kakao } = window;
  const getGeolocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      const { longitude, latitude } = data && data.coords;
      const location = { latitude, longitude };
      drawMap(location);
    });
  }, []);
  const drawMap = (data: Idata) => {
    let container = document.getElementById('map');

    let options = {
      center: new kakao.maps.LatLng(data.latitude, data.longitude),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    var icon = new kakao.maps.MarkerImage(
      'https://user-images.githubusercontent.com/48983361/104079506-d21a1a80-5266-11eb-8d81-defccb24070d.png',
      new kakao.maps.Size(31, 37)
    );

    let markerPosition = new kakao.maps.LatLng(data.latitude, data.longitude);

    let marker = new kakao.maps.Marker({
      position: markerPosition,
      image: icon,
    });
    marker.setMap(map);
  };

  useEffect(() => {
    getGeolocation();
  }, [getGeolocation]);

  return (
    <>
      <RiderControlMap />
    </>
  );
};

export default RiderControlMapContainer;

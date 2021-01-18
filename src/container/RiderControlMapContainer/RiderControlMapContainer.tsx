import React, { useEffect, useState, useCallback, useRef } from 'react';
import RiderControlMap from 'components/RiderControlMap';
import RiderControlMapRepository from 'repository/RiderControlMapRepository';
import { useRecoilState } from 'recoil';
import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import DriverSocket from './RiderSingleton';
import { IRiderSocketLocation } from 'interface/RiderControlMap';
import _ from 'underscore';

interface ILocation {
  latitude: number;
  longitude: number;
}

class MapSingleton {

  private static instance: MapSingleton;

  private constructor() {
    navigator.geolocation.getCurrentPosition((data) => {
      let lat = 36;
      let long = 127;

      if (data) {
        const { longitude, latitude } = data.coords;
        lat = latitude;
        long = longitude;
      }

      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(
          lat,
          long,
        ),
        level: 6,
      };

      this.map = new window.kakao.maps.Map(container, options);

      var marker = new window.kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다 
        position: MapSingleton.getInstance().map.getCenter()
      });
      // 지도에 마커를 표시합니다
      marker.setMap(MapSingleton.getInstance().map);
    })
  }

  public map: any;
  private markersEl: any[] = [];

  setMarkers(markers: IMarker[]) {
    for (const markerEl of this.markersEl) {
      markerEl.setMap(null);
    }
    const map = MapSingleton.getInstance().map;

    for (const marker of markers) {
      const markerEl = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(marker.lat, marker.long),
      });

      this.markersEl.push(markerEl);
      markerEl.setMap(map);
    }
  }

  static getInstance() {
    if (MapSingleton.instance === undefined) {
      MapSingleton.instance = new MapSingleton();
    }

    return MapSingleton.instance;
  }
}

interface IMarker {
  lat: number;
  long: number;
  driverIdx: number;
}

const RiderControlMapContainer = () => {
  const [, setOriginDriverState] = useRecoilState(DriverDeliveryState);
  const [driverLocation, setDriverLocation] = useState<any>([]);
  const [markers, setMarkers] = useState<IMarker[]>([]);

  const handleGetDriverState = useCallback(async () => {
    const res = await RiderControlMapRepository.getDriversState();
    setOriginDriverState(res);
  }, [setOriginDriverState]);

  // let location: any = [];

  const handleRiderLocation = useCallback(
    ({ data }: IRiderSocketLocation) => {
      // location.push(data);
      // const non_duplicated_data = _.uniq(location, 'driverIdx');
      // setDriverLocation(non_duplicated_data);

      console.log('pass');

      const markerIdx = markers.findIndex(e => e.driverIdx === data.driverIdx)
      if (markerIdx !== -1) {
        const marker = { ...markers[markerIdx] };
        marker.lat = data.lat;
        marker.long = data.long;
        setMarkers([
          ...markers.slice(0, markerIdx),
          marker,
          ...markers.slice(markerIdx),
        ]);
        console.log(markers);
      } else {
        const marker = {
          ...data,
        }
        setMarkers([
          ...markers,
          marker,
        ]);
      }
    },
    [markers]
  );
  useEffect(() => {
    handleGetDriverState();
    DriverSocket.getInstance(handleRiderLocation);
    MapSingleton.getInstance();
    MapSingleton.getInstance().setMarkers(markers);
  }, [handleGetDriverState, handleRiderLocation, markers]);

  return (
    <>
      <RiderControlMap />
    </>
  );
};

export default RiderControlMapContainer;

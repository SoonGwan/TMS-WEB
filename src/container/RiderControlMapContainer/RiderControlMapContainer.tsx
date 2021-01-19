import React, { useEffect, useState, useCallback, useRef } from 'react';
import DriverSocket from './RiderSingleton';
import dtil from 'dtil';
import RiderControlMap from 'components/RiderControlMap';
import RiderControlMapRepository from 'repository/RiderControlMapRepository';
import RiderStatusListItemTemplate from 'components/RiderControlMap/RiderStatusList/RiderStatusListItemTemplate';
import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import { useRecoilState } from 'recoil';
import {
  IDeliveringList,
  IRiderSocketLocation,
} from 'interface/RiderControlMap';

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
        center: new window.kakao.maps.LatLng(lat, long),
        level: 6,
      };

      this.map = new window.kakao.maps.Map(container, options);

      var marker = new window.kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: MapSingleton.getInstance().map.getCenter(),
      });
      // 지도에 마커를 표시합니다
      marker.setMap(MapSingleton.getInstance().map);
    });
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
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [deliverlingList, setDeliverlingList] = useState<IDeliveringList[]>();

  const handleDeliveringList = useCallback(async () => {
    try {
      const today = dtil().format('YYYY-MM-DD');
      const {
        data: { data },
      } = await RiderControlMapRepository.deliveringList(today);
      const { deliveries } = data;

      let deliveringList: IDeliveringList[] = [];

      for (let i = 0; i < deliveries.length; i += 1) {
        const {
          createdAt,
          customer,
          customerIdx,
          driver,
          driverIdx,
          endOrderNumber,
          endTime,
          idx,
        } = deliveries[i];

        const list: IDeliveringList = {
          key: idx,
          createdAt: dtil(createdAt).format('HH:mm:ss'),
          customerIdx,
          customerName: customer.name,
          customerAdress: customer.address,
          driverIdx,
          driverName: driver.name,
          endOrderNumber,
          endTime,
        };

        deliveringList.push(list);

        setDeliverlingList(deliveringList);
      }
    } catch (err) {
      return err;
    }
  }, []);

  const handleRiderLocation = useCallback(
    ({ data }: IRiderSocketLocation) => {
      console.log('pass');

      const markerIdx = markers.findIndex(
        (e) => e.driverIdx === data.driverIdx
      );
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
        };
        setMarkers([...markers, marker]);
      }
    },
    [markers]
  );

  useEffect(() => {
    DriverSocket.getInstance(handleRiderLocation);
    MapSingleton.getInstance();
    MapSingleton.getInstance().setMarkers(markers);
    handleDeliveringList();
  }, [handleDeliveringList, handleRiderLocation, markers]);
  return (
    <>
      <RiderControlMap />
    </>
  );
};

export default RiderControlMapContainer;

import React, { useEffect, useState, useCallback } from 'react';
import DriverSocket from './RiderSingleton';
import dtil from 'dtil';
import RiderControlMap from 'components/RiderControlMap';
import RiderControlMapRepository from 'repository/RiderControlMapRepository';
import {
  IDeliveringList,
  IRiderSocketLocation,
} from 'interface/RiderControlMap';

class MapSingleton {
  private static instance: MapSingleton;

  private constructor() {
    // this.initMap();
  }

  public map: any;
  private markersEl: any[] = [];
  public isLoaded = false;
  public markers: IMarker[] = [];

  public initMap() {
    if (this.isLoaded) {
      return;
    }

    let lat = 36;
    let long = 127;

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(lat, long),
      level: 12,
    };

    this.map = new window.kakao.maps.Map(container, options);

    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    MapSingleton.getInstance().map.addControl(
      mapTypeControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    );

    const zoomControl = new window.kakao.maps.ZoomControl();
    MapSingleton.getInstance().map.addControl(
      zoomControl,
      window.kakao.maps.ControlPosition.RIGHT
    );

    // const marker = new window.kakao.maps.Marker({});

    // marker.setMap(MapSingleton.getInstance().map);
    this.isLoaded = true;

    this.setMarkers(this.markers);
  }
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
  driverId: string;
}

const RiderControlMapContainer = () => {
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
      const markerIdx = markers.findIndex((e) => e.driverId === data.driverId);
      if (markerIdx !== -1) {
        const marker = { ...markers[markerIdx] };
        marker.lat = data.lat;
        marker.long = data.long;
        setMarkers([
          ...markers.slice(0, markerIdx),
          marker,
          ...markers.slice(markerIdx),
        ]);
      } else {
        const marker = {
          ...data,
        };
        setMarkers([...markers, marker]);
        MapSingleton.getInstance().markers = [...markers, marker];
      }
    },
    [markers]
  );

  useEffect(() => {
    DriverSocket.getInstance(handleRiderLocation);
    MapSingleton.getInstance().initMap();
    MapSingleton.getInstance().setMarkers(MapSingleton.getInstance().markers);
  }, [handleRiderLocation, markers]);

  useEffect(() => {
    handleDeliveringList();
  }, [handleDeliveringList]);

  useEffect(() => {
    return () => {
      // MapSingleton.getInstance().markers = markers;
      MapSingleton.getInstance().isLoaded = false;
    };
  }, []);
  return (
    <>
      <RiderControlMap />
    </>
  );
};

export default RiderControlMapContainer;

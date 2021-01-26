import React, { useCallback, useEffect, useState } from 'react';
import DeliveryStatus from 'components/DeliveryStatus';
import DeliveryStatusRepository from 'repository/DeliveryStatusRepository';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allProductList,
  deliveriesList,
  trackingInfoModal,
} from 'atom/DeliveryStatusAtom';
import { DeliveryTable } from 'enum/DeliveryTable';
import moment from 'moment';
import MemberRepository from 'repository/MemberRepository';
import {
  IDeliveries,
  IDriverCompleted,
  IDriverCompletedCustom,
  IDriverList,
} from 'interface/DeliveryStatus';
import TrackingDriverInfo from 'components/DeliveryStatus/TrackingDriverInfo';
import TrackingDriverList from 'components/DeliveryStatus/TrackingDriverList';
import TrackDriverInfoImageModal from 'components/DeliveryStatus/TrackDriverInfoImageModal';
import Loading from 'components/common/Loading';

const DeliveryStatusContainer = () => {
  const [, setProductList] = useRecoilState<IDriverCompletedCustom[]>(
    allProductList
  );
  const [isOpenInfoModal, setIsOpenInfoModal] = useRecoilState(
    trackingInfoModal
  );
  const [, setDeliveriesList] = useRecoilState<IDriverCompleted[]>(
    deliveriesList
  );
  const [tableValue, setTableValue] = useState(DeliveryTable.ALL);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD') || '');
  const [driverListElement, setDriverListElement] = useState<HTMLElement>();
  const [deliveriesInfoElement, setDeliveriesInfoElement] = useState<
    HTMLElement
  >();
  const [deliveriesListLeng, setDeliveriesListLeng] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<string>('');
  const [selectedDriverName, setSelectedDriverName] = useState<string>('');
  const [distance, setDistance] = useState<number>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [distaceLoading, setDistanceLoading] = useState<Boolean>(false);

  const handleOpenInfoModal = useCallback(() => {
    setIsOpenInfoModal(!isOpenInfoModal);
  }, [isOpenInfoModal, setIsOpenInfoModal]);

  const handleDriverDistance = useCallback(async (id: string) => {
    try {
      setDistanceLoading(true);

      setDistance(undefined);
      const { data } = await DeliveryStatusRepository.driverDistance(id);
      const { distance } = data;

      setDistance(distance);

      setDistanceLoading(false);
    } catch (err) {
      setDistanceLoading(false);

      return err;
    }
  }, []);

  const selectDriver = useCallback(
    async (name: string, id: string) => {
      setIsLoading(true);

      setSelectedDriverName(name);
      await handleDriverDistance(id);

      setIsLoading(false);
    },
    [handleDriverDistance]
  );

  const handleDeliveryList = useCallback(async () => {
    try {
      setIsLoading(true);

      const {
        data: { data },
      } = await DeliveryStatusRepository.deliveryList(date);
      const { deliveries } = data;

      let driveriesTemp = [] as IDriverCompletedCustom[];

      for (let i = 0; i < deliveries.length; i += 1) {
        const {
          customer,
          driver,
          endOrderNumber,
          endTime,
          productName,
        } = deliveries[i];

        const temp: IDriverCompletedCustom = {
          customerIdx: customer.idx,
          customerName: customer.name,
          customerAddress: customer.address,
          customerPhone: customer.phone,
          productName: productName,
          driverName: driver.name,
          driverAddress: driver.address,
          driverPhone: driver.phone,
          driverTruckNumber: driver.truckNumber,
          driverTruckSize: driver.truckSize,
          endOrderNumber,
          endTime,
        };

        driveriesTemp.push(temp);
      }

      setProductList(driveriesTemp);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      return err;
    }
  }, [date, setProductList]);

  const handleTableValue = useCallback((value: number) => {
    setTableValue(value);
  }, []);

  const tableHeaderText = (tableValue: number) => {
    const tableHeader =
      tableValue === DeliveryTable.ALL ? (
        <div>전체 물류 리스트</div>
      ) : tableValue === DeliveryTable.DELIVERING ? (
        <div>배달중인 리스트</div>
      ) : tableValue === DeliveryTable.DONE ? (
        <div>배송 완료 리스트</div>
      ) : null;

    return tableHeader;
  };

  // const openImageModal = useCallback(() => {
  //   setIsOpenModal(!isOpenModal);
  // }, [isOpenModal]);

  const handleTrackingForDriver = useCallback(
    async (idx: string) => {
      try {
        setIsLoading(true);

        const {
          data: { data },
        } = await DeliveryStatusRepository.trackingForDriver(idx);
        const { deliveries } = data;
        setSelectedIdx(idx);
        setDeliveriesListLeng(deliveries.length);

        setDeliveriesList(deliveries);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        return err;
      }
    },
    [setDeliveriesList]
  );

  const handleDriverList = useCallback(async () => {
    try {
      setIsLoading(true);

      const {
        data: { data },
      } = await MemberRepository.getDrivers();
      const { drivers } = data;

      const driverList = drivers.map((data: IDriverList) => {
        const {
          id,
          idx,
          isDelivering,
          name,
          address,
          phone,
          truckNumber,
          totalCount,
          completedCount,
        } = data;
        return (
          <>
            <TrackingDriverList
              handleOpenInfoModal={handleOpenInfoModal}
              handleTrackingForDriver={handleTrackingForDriver}
              id={id}
              idx={idx}
              isDelivering={isDelivering}
              name={name}
              phone={phone}
              truckNumber={truckNumber}
              address={address}
              selectedIdx={selectedIdx}
              totalCount={totalCount}
              completedCount={completedCount}
              selectDriver={selectDriver}
            />
          </>
        );
      });
      setDriverListElement(driverList);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      return err;
    }
  }, [handleOpenInfoModal, handleTrackingForDriver, selectDriver, selectedIdx]);

  useEffect(() => {
    handleDeliveryList();
    handleDriverList();
  }, [handleDeliveryList, handleDriverList]);

  return (
    <>
      {distaceLoading && <Loading />}
      {isLoading && <Loading />}
      <DeliveryStatus
        tableValue={tableValue}
        handleTableValue={handleTableValue}
        tableHeaderText={tableHeaderText}
        date={date}
        setDate={setDate}
        driverListElement={driverListElement}
        deliveriesInfoElement={deliveriesInfoElement}
        deliveriesListLeng={deliveriesListLeng}
        selectedDriverName={selectedDriverName}
        distance={distance}
      />
      {/* {isOpenModal && (
        <TrackDriverInfoImageModal openImageModal={openImageModal} />
      )} */}
      {isOpenInfoModal ? <TrackingDriverInfo distance={distance} /> : null}
    </>
  );
};

export default DeliveryStatusContainer;

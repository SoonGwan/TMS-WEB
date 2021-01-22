import React, { useCallback, useEffect, useState } from 'react';
import DeliveryStatus from 'components/DeliveryStatus';
import DeliveryStatusRepository from 'repository/DeliveryStatusRepository';
import { useRecoilState } from 'recoil';
import { allProductList } from 'atom/DeliveryStatusAtom';
import { DeliveryTable } from 'enum/DeliveryTable';
import moment from 'moment';
import MemberRepository from 'repository/MemberRepository';
import { IDeliveries, IDriverList } from 'interface/DeliveryStatus';
import TrackingDriverInfo from 'components/DeliveryStatus/TrackingDriverInfo';
import TrackingDriverList from 'components/DeliveryStatus/TrackingDriverList';
import TrackDriverInfoImageModal from 'components/DeliveryStatus/TrackDriverInfoImageModal';

const DeliveryStatusContainer = () => {
  const [, setProductList] = useRecoilState(allProductList);
  const [tableValue, setTableValue] = useState(DeliveryTable.ALL);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD') || '');
  const [driverListElement, setDriverListElement] = useState<HTMLElement>();
  const [deliveriesInfoElement, setDeliveriesInfoElement] = useState<
    HTMLElement
  >();
  const [deliveriesListLeng, setDeliveriesListLeng] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);
  const handleDeliveryList = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await DeliveryStatusRepository.deliveryList(date);
      const { deliveries } = data;

      let driveriesTemp = [];

      for (let i = 0; i < deliveries.length; i += 1) {
        const {
          customer,
          driver,
          endOrderNumber,
          endTime,
          productName,
        } = deliveries[i];
        const temp = {
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
    } catch (err) {
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

  const handleTrackingForDriver = useCallback(async (idx: string) => {
    try {
      const {
        data: { data },
      } = await DeliveryStatusRepository.trackingForDriver(idx);
      const { deliveries } = data;

      setSelectedIdx(idx);
      setDeliveriesListLeng(deliveries.length);
      const deliveriesInfo = deliveries.map((data: IDeliveries) => {
        const { createdAt, customer, driver, productName, image, idx } = data;
        return (
          <TrackingDriverInfo
            customerIdx={customer.idx}
            customerName={customer.name}
            customerAddress={customer.address}
            driverName={driver.name}
            product={productName}
            image={image}
            idx={idx}
          />
        );
      });
      setDeliveriesInfoElement(deliveriesInfo);
    } catch (err) {
      return err;
    }
  }, []);

  const handleDriverList = useCallback(async () => {
    try {
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
            />
          </>
        );
      });
      setDriverListElement(driverList);
    } catch (err) {
      return err;
    }
  }, [handleTrackingForDriver, selectedIdx]);

  useEffect(() => {
    handleDeliveryList();
    handleDriverList();
  }, [handleDeliveryList, handleDriverList]);
  return (
    <>
      <DeliveryStatus
        tableValue={tableValue}
        handleTableValue={handleTableValue}
        tableHeaderText={tableHeaderText}
        date={date}
        setDate={setDate}
        driverListElement={driverListElement}
        deliveriesInfoElement={deliveriesInfoElement}
        deliveriesListLeng={deliveriesListLeng}
      />
      {/* {isOpenModal && (
        <TrackDriverInfoImageModal openImageModal={openImageModal} />
      )} */}
    </>
  );
};

export default DeliveryStatusContainer;

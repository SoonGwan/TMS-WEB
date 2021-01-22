import { allProductList } from 'atom/DeliveryStatusAtom';
import { DeliveryTable } from 'enum/DeliveryTable';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import DeliveryStatusListItemElement from '../DeliveryStatusListItemElement';
import './DeliveryStatusListItemTemplate.scss';

interface IDeliveryStatusListItemTemplate {
  tableValue: number;
}

const DeliveryStatusListItemTemplate = ({
  tableValue,
}: IDeliveryStatusListItemTemplate) => {
  const product = useRecoilValue(allProductList);

  const driverList =
    tableValue === DeliveryTable.ALL
      ? product.map((data) => {
          const {
            customerIdx,
            customerName,
            customerAddress,
            driverIdx,
            driverName,
            productName,
            driverAddress,
            endOrderNumber,
            endTime,
            customerPhone,
            driverPhone,
            driverTruckNumber,
            driverTruckSize,
          } = data;

          return (
            <DeliveryStatusListItemElement
              customerIdx={customerIdx}
              customerName={customerName}
              customerAddress={customerAddress}
              driverIdx={driverIdx}
              driverName={driverName}
              productName={productName}
              driverAddress={driverAddress}
              endOrderNumber={endOrderNumber}
              customerPhone={customerPhone}
              driverPhone={driverPhone}
              driverTruckNumber={driverTruckNumber}
              driverTruckSize={driverTruckSize}
            />
          );
        })
      : tableValue === DeliveryTable.DELIVERING
      ? product
          .filter((element) => element.endTime === null)
          .map((data) => {
            const {
              customerIdx,
              customerName,
              customerAddress,
              driverIdx,
              driverName,
              productName,
              driverAddress,
              endOrderNumber,
              endTime,
              customerPhone,
              driverPhone,
              driverTruckNumber,
              driverTruckSize,
            } = data;

            return (
              <DeliveryStatusListItemElement
                customerIdx={customerIdx}
                customerName={customerName}
                customerAddress={customerAddress}
                driverIdx={driverIdx}
                driverName={driverName}
                productName={productName}
                driverAddress={driverAddress}
                endOrderNumber={endOrderNumber}
                customerPhone={customerPhone}
                driverPhone={driverPhone}
                driverTruckNumber={driverTruckNumber}
                driverTruckSize={driverTruckSize}
              />
            );
          })
      : tableValue === DeliveryTable.DONE
      ? product
          .filter((element) => element.endTime !== null)
          .map((data) => {
            const {
              customerIdx,
              customerName,
              customerAddress,
              driverIdx,
              driverName,
              productName,
              driverAddress,
              endOrderNumber,
              endTime,
              customerPhone,
              driverPhone,
              driverTruckNumber,
              driverTruckSize,
            } = data;
            return (
              <DeliveryStatusListItemElement
                customerIdx={customerIdx}
                customerName={customerName}
                customerAddress={customerAddress}
                driverIdx={driverIdx}
                driverName={driverName}
                productName={productName}
                driverAddress={driverAddress}
                endOrderNumber={endOrderNumber}
                customerPhone={customerPhone}
                driverPhone={driverPhone}
                driverTruckNumber={driverTruckNumber}
                driverTruckSize={driverTruckSize}
              />
            );
          })
      : null;

  return <div>{driverList}</div>;
};

export default DeliveryStatusListItemTemplate;

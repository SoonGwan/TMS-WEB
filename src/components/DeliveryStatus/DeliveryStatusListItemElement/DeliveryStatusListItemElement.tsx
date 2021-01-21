import React, { useState } from 'react';
import './DeliveryStatusListItemElement.scss';

interface IDeliveryStatusListItemElement {
  customerIdx: number;
  customerName: string;
  customerAddress: string;
  driverIdx: number;
  driverName: string;
  productName: string;
  driverAddress: string;
  endOrderNumber: string;
}

const DeliveryStatusListItemElement = ({
  customerIdx,
  customerName,
  customerAddress,
  driverIdx,
  driverName,
  productName,
  driverAddress,
  endOrderNumber,
}: IDeliveryStatusListItemElement) => {
  return (
    <>
      <div
        className="DeliveryStatusListItemElement"
        onClick={() => console.log(productName)}
      >
        <div className="DeliveryStatusListItemElement-DriverId">
          {driverName}({driverIdx})
        </div>
        <div className="DeliveryStatusListItemElement-ClientId">
          {customerName}({customerIdx})
        </div>
        <div className="DeliveryStatusListItemElement-StartAddress">
          {customerAddress}
        </div>
        <div className="DeliveryStatusListItemElement-Product">
          {productName}
        </div>
      </div>
    </>
  );
};

export default DeliveryStatusListItemElement;

import React from 'react';
import './TrackingDriverInfo.scss';

interface ITrackingDriverInfo {
  customerIdx: number;
  customerName: string;
  customerAddress: string;
  driverIdx: number;
  driverName: string;
  product: string;
}

const TrackingDriverInfo = ({
  customerIdx,
  customerName,
  customerAddress,
  driverIdx,
  driverName,
  product,
}: ITrackingDriverInfo) => {
  return (
    <>
      <div className="TrakingDriverInfo">
        <div className="TrakingDriverInfo-DriverName">
          {driverName} ({driverIdx})
        </div>
        <div className="TrakingDriverInfo-CustomerName">
          {customerName} ({customerIdx})
        </div>
        <div className="TrakingDriverInfo-CustomerAddress">
          {customerAddress}
        </div>
        <div className="TrakingDriverInfo-Product">{product}</div>
      </div>
    </>
  );
};

export default TrackingDriverInfo;

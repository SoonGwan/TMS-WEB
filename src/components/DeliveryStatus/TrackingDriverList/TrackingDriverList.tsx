import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';

interface ITrackingDriverList {
  address: string;
  id: string;
  idx: number;
  isDelivering: Boolean;
  name: string;
  handleTrackingForDriver: (args: string) => void;
  selectedIdx: string;
  totalCount: number;
  completedCount: number;
  phone: string;
  truckNumber: string;
  selectDriver: (arg1: string, arg2: string) => void;
}

const style = require('./TrackingDriverList.scss');
const cx: ClassNamesFn = classNames.bind(style);

const TrackingDriverList = ({
  address,
  id,
  idx,
  isDelivering,
  name,
  handleTrackingForDriver,
  selectedIdx,
  totalCount,
  completedCount,
  phone,
  truckNumber,
  selectDriver,
}: ITrackingDriverList) => {
  const composeDeliveryCountLabel = () => {
    if (totalCount === completedCount) {
      return (
        <div className="DriverTableItem-DeliveryCount-Completed">
          <span>
            {completedCount} / {totalCount}
          </span>
        </div>
      );
    }

    return (
      <div className="DriverTableItem-DeliveryCount-Delivery">
        <span>
          {completedCount} / {totalCount}
        </span>
      </div>
    );
  };
  return (
    <div
      className={cx('TrackingDriverInfo', {
        'TrackingDriverInfo-selected': selectedIdx === id,
      })}
      onClick={() => {
        handleTrackingForDriver(id);
        selectDriver(name, id);
      }}
      key={idx}
    >
      <div className={cx('TrackingDriverInfo-DriverName')}>{name}</div>
      <div className={cx('TrackingDriverInfo-PhoneNumber')}>{phone}</div>
      <div className={cx('TrackingDriverInfo-TruckNumber')}>{truckNumber}</div>
      <div className={cx('TrackingDriverInfo-TotalCount')}>
        {composeDeliveryCountLabel()}
      </div>
    </div>
  );
};

export default TrackingDriverList;

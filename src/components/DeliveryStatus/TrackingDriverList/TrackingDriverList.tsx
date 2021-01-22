import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';

interface ITrackingDriverList {
  address: string;
  id: string;
  idx: number;
  isDelivering: Boolean;
  name: string;
  handleTrackingForDriver: (args: number) => void;
  selectedIdx: number;
  totalCount: number;
  completedCount: number;
  phone: string;
  truckNumber: string;
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
}: ITrackingDriverList) => {
  return (
    <div
      className={cx('TrackingDriverInfo', {
        'TrackingDriverInfo-selected': selectedIdx === idx,
      })}
      onClick={() => {
        handleTrackingForDriver(idx);
      }}
      key={idx}
    >
      <div className={cx('TrackingDriverInfo-DriverName')}>{name}</div>
      <div className={cx('TrackingDriverInfo-PhoneNumber')}>{phone}</div>
      <div className={cx('TrackingDriverInfo-TruckNumber')}>{truckNumber}</div>
      <div className={cx('TrackingDriverInfo-TotalCount')}>
        {completedCount} / {totalCount}
      </div>
    </div>
  );
};

export default TrackingDriverList;

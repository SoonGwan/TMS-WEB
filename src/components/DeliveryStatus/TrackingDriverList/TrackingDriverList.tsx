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
      <div className={cx('TrackingDriverInfo-DriverId')}>
        {id}({idx})
      </div>
      <div className={cx('TrackingDriverInfo-DriverName')}>{name}</div>
      <div className={cx('TrackingDriverInfo-DriverAddress')}>{address}</div>
      <div className={cx('TrackingDriverInfo-IsDelivering')}>
        {isDelivering ? '온라인' : '오프라인'}
      </div>
    </div>
  );
};

export default TrackingDriverList;

import { TrackDriverInfoModal } from 'atom/TrackDriverInfoAtom';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import TrackDriverInfoImageModal from '../TrackDriverInfoImageModal';

import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';

const style = require('./TrackingDriverInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ITrackingDriverInfo {
  customerIdx: number;
  customerName: string;
  customerAddress: string;
  driverName: string;
  product: string;
  image: string | null;
  idx: number;
  // openImageModal: () => void;
}

const TrackingDriverInfo = ({
  customerIdx,
  customerName,
  customerAddress,
  driverName,
  product,
  image,
  idx,
}: // openImageModal,
ITrackingDriverInfo) => {
  const [img, setImg] = useState<string | null>('');
  const [isModal, setIsModal] = useState<Boolean>(false);
  const imageSelected = (clickImg: string | null) => {
    setImg(clickImg);
  };

  const openModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <div
        className={'TrakingDriverInfo'}
        onClick={() => {
          openModal();
          imageSelected(image);
        }}
        key={idx}
      >
        <div className="TrakingDriverInfo-DriverName">{driverName}</div>
        <div className="TrakingDriverInfo-CustomerName">{customerName}</div>
        <div className="TrakingDriverInfo-CustomerAddress">
          {customerAddress}
        </div>
        <div className="TrakingDriverInfo-Product">{product}</div>
      </div>
      {isModal && <TrackDriverInfoImageModal openModal={openModal} img={img} />}
    </>
  );
};

export default TrackingDriverInfo;

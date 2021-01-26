import { TrackDriverInfoModal } from 'atom/TrackDriverInfoAtom';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import TrackDriverInfoImageModal from '../TrackDriverInfoImageModal';

import classNames from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';
import { deliveriesList, trackingInfoModal } from 'atom/DeliveryStatusAtom';

const style = require('./TrackingDriverInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ITrackingDriverInfo {
  distance: number | undefined;
}

const TrackingDriverInfo = ({ distance }: ITrackingDriverInfo) => {
  const [img, setImg] = useState<string | null>('');
  const [isModal, setIsModal] = useState<Boolean>(false);
  const [, setIsOpenInfoModal] = useRecoilState(trackingInfoModal);
  const deliveriesLists = useRecoilValue(deliveriesList);

  const imageSelected = (clickImg: string | null) => {
    setImg(clickImg);
  };

  const openModal = () => {
    setIsModal(!isModal);
  };
  const closeModal = () => {
    setIsOpenInfoModal(false);
  };

  const list = deliveriesLists.map((data) => {
    const { image, idx, productName, customer, driver } = data;
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
          <div className="TrakingDriverInfo-Product">{productName}</div>
          <div className="TrakingDriverInfo-CustomerName">{customer.name}</div>
          <div className="TrakingDriverInfo-DriverName">{driver.name}</div>
          <div className="TrakingDriverInfo-CustomerAddress">
            {customer.address}
          </div>
        </div>
        {isModal && (
          <TrackDriverInfoImageModal openModal={openModal} img={img} />
        )}
      </>
    );
  });

  return (
    <>
      <div className="TrackingDriverInfoModal">
        <div
          className="TrackingDriverInfoModal-Wrapper"
          onClick={() => {
            closeModal();
          }}
        ></div>
        <div className="TrackingDriverInfoModal-Modal">
          <div className={cx('DeliveryStatus-SubInfo-DriverInfo-Header')}>
            <div>배송기사 배달 완료 내역</div>
            <div>{!distance ? '0' : distance}km</div>
          </div>

          <div className={cx('DeliveryStatus-SubInfo-DriverInfo-ItemWrapper')}>
            <div
              className={cx(
                'DeliveryStatus-SubInfo-DriverInfo-ItemWrapper-Header'
              )}
            >
              <div
                className={cx(
                  'DeliveryStatus-SubInfo-DriverInfo-ItemWrapper-Header-Product'
                )}
              >
                상품명
              </div>
              <div
                className={cx(
                  'DeliveryStatus-SubInfo-DriverInfo-ItemWrapper-Header-Customer'
                )}
              >
                고객
              </div>
              <div
                className={cx(
                  'DeliveryStatus-SubInfo-DriverInfo-ItemWrapper-Header-DriverName'
                )}
              >
                배송기사
              </div>
              <div
                className={cx(
                  'DeliveryStatus-SubInfo-DriverInfo-ItemWrapper-Header-Address'
                )}
              >
                주소
              </div>
            </div>
            <div
              className={cx(
                'DeliveryStatus-SubInfo-DriverInfo-ItemWrapper-Section'
              )}
            >
              {list.length === 0 ? (
                <>
                  <div
                    className={cx(
                      'DeliveryStatus-SubInfo-DriverInfo-ItemWrapper-Empty'
                    )}
                  >
                    해당 배송기사는 내역이 없습니다.
                  </div>
                </>
              ) : (
                list
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingDriverInfo;

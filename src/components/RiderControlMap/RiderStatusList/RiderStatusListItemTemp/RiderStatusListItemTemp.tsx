import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import StatusLabel from 'components/common/StatusLabel/StatusLabel';
import React from 'react';
import { useRecoilValue } from 'recoil';
import './RiderStatusListItemTemp.scss';
import { RiderStatus } from 'enum/RiderStatusList';

interface IRiderStatusListItemTemp {
  id: number;
  state: number;
  adress: string;
  time: string;
}

const RiderStatusListItemTemp = () => {
  const driver = useRecoilValue(DriverDeliveryState);
  const driverList = driver.map((data: IRiderStatusListItemTemp) => {
    console.log(data);
    const { id, state, adress, time } = data;
    return (
      <>
        <div className="RiderStatusListItemTemp">
          <div className="RiderStatusListItemTemp-Idx">{id}</div>
          <div className="RiderStatusListItemTemp-Status">
            <StatusLabel
              text={state === RiderStatus.WAITING ? '배차 대기' : '배차 완료'}
              status={state === RiderStatus.WAITING ? 'normal' : 'warning'}
            />
          </div>
          <div className="RiderStatusListItemTemp-Adress">{adress}</div>
          <div className="RiderStatusListItemTemp-Time">{time}</div>
        </div>
      </>
    );
  });
  return <>{driverList}</>;
};

export default RiderStatusListItemTemp;

import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import StatusLabel from 'components/common/StatusLabel/StatusLabel';
import React from 'react';
import { useRecoilValue } from 'recoil';
import './RiderStatusListItemTemplate.scss';
import { RiderStatus } from 'enum/RiderStatusList';

interface IRiderStatusListItemTemplate {
  id: number;
  state: number;
  adress: string;
  time: string;
}

const RiderStatusListItemTemplate = () => {
  const driver = useRecoilValue(DriverDeliveryState);
  const driverList = driver.map((data: IRiderStatusListItemTemplate) => {
    const { id, state, adress, time } = data;
    return (
      <>
        <div className="RiderStatusListItemTemplate">
          <div className="RiderStatusListItemTemplate-Idx">{id}</div>
          <div className="RiderStatusListItemTemplate-Status">
            <StatusLabel
              text={state === RiderStatus.WAITING ? '배차 대기' : '배차 완료'}
              status={state === RiderStatus.WAITING ? 'normal' : 'warning'}
            />
          </div>
          <div className="RiderStatusListItemTemplate-Adress">{adress}</div>
          <div className="RiderStatusListItemTemplate-Time">{time}</div>
        </div>
      </>
    );
  });
  return <>{driverList}</>;
};

export default RiderStatusListItemTemplate;

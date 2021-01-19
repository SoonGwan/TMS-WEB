import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import StatusLabel from 'components/common/StatusLabel/StatusLabel';
import React from 'react';
import { useRecoilValue } from 'recoil';
import './RiderStatusListItemTemplate.scss';
import { RiderStatus } from 'enum/RiderStatusList';

interface IRiderStatusListItemTemplate {
  key: number | null | undefined;
  createdAt: string;
  customerIdx: number;
  customerName: string;
  customerAdress: string;
  driverIdx: number;
  driverName: string;
}

const RiderStatusListItemTemplate = ({
  key,
  createdAt,
  customerIdx,
  customerName,
  customerAdress,
  driverIdx,
  driverName,
}: IRiderStatusListItemTemplate) => {
  return (
    <>
      <div className="RiderStatusListItemTemplate" key={key}>
        <div className="RiderStatusListItemTemplate-Idx">
          {customerName}({customerIdx})
        </div>
        <div className="RiderStatusListItemTemplate-Status">
          {driverName} ({driverIdx})
        </div>
        <div className="RiderStatusListItemTemplate-Adress">
          {customerAdress}
        </div>
        <div className="RiderStatusListItemTemplate-Time">{createdAt}</div>
      </div>
    </>
  );
};

export default RiderStatusListItemTemplate;

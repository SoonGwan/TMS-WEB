import { DriverDeliveryState } from 'atom/RiderControlMapAtom';
import StatusLabel from 'components/common/StatusLabel/StatusLabel';
import React from 'react';
import { useRecoilValue } from 'recoil';
import './RiderStatusListItemTemplate.scss';
import { RiderStatus } from 'enum/RiderStatusList';

const RiderStatusListItemTemplate = () => {
  return (
    <>
      <div className="RiderStatusListItemTemplate">
        <div className="RiderStatusListItemTemplate-Idx">
          {/* {customerName}({customerIdx}) */}
        </div>
        <div className="RiderStatusListItemTemplate-Status">
          {/* {driverName} ({}) */}
        </div>
        <div className="RiderStatusListItemTemplate-Adress">
          {/* {customerAdress} */}
        </div>
        <div className="RiderStatusListItemTemplate-Time">
          {/* {createdAt} */}
        </div>
      </div>
    </>
  );
};

export default RiderStatusListItemTemplate;

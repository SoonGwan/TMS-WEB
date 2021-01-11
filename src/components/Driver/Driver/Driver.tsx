import { MemberType } from 'enum/Driver';
import { ISelectableDriver } from 'interface/Member';
import React from 'react';
import DriverDeliveryChart from '../DriverDeliveryChart';
import DriverTable from '../DriverTable';

import './Driver.scss';

interface IDriver {
  drivers: ISelectableDriver[];
  driverItems: JSX.Element[],
  memberFilterType: MemberType,
  handleMemberTypeFilter: () => void;
}

const Driver = ({
  drivers,
  driverItems,
  memberFilterType,
  handleMemberTypeFilter,
}: IDriver) => {
  return (
    <div className="Driver">
      <DriverTable
        driverItems={driverItems}
        memberFilterType={memberFilterType}
        handleMemberTypeFilter={handleMemberTypeFilter} />
      <DriverDeliveryChart drivers={drivers} />
    </div>
  )
}

export default Driver;
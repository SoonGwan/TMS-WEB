import { MemberLevel } from 'enum/Member';
import { IDriverWithCount } from 'interface/Member';
import React from 'react';
import DriverDeliveryChart from '../DriverDeliveryChart';
import MemberTable from '../MemberTable';

import './MemberBox.scss';

interface IMemberBox {
  levelFilter: MemberLevel,
  driverItems: JSX.Element[],
  customerItems: JSX.Element[],
  handleFilterMember: () => void;
  drivers: IDriverWithCount[];
}

const MemberBox = ({
  levelFilter,
  driverItems,
  customerItems,
  handleFilterMember,
  drivers,
}: IMemberBox) => {
  return (
    <div className="MemberBox">
      <MemberTable
        memberLevel={levelFilter}
        handleFilterMember={handleFilterMember}
        driverItems={driverItems}
        customerItems={customerItems} />
      <DriverDeliveryChart drivers={drivers} />
    </div>
  )
}

export default MemberBox;
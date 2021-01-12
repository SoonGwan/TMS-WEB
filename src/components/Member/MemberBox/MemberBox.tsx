import { MemberLevel } from 'enum/Member';
import { IDriver } from 'interface/Member';
import React from 'react';
import DriverDeliveryChart from '../DriverDeliveryChart';
import MemberTable from '../MemberTable';

import './MemberBox.scss';

interface IMemberBox {
  levelFilter: MemberLevel,
  memberItems: JSX.Element[],
  handleFilterMember: () => void;
  drivers: IDriver[];
}

const MemberBox = ({
  levelFilter,
  memberItems,
  handleFilterMember,
  drivers,
}: IMemberBox) => {
  return (
    <div className="Driver">
      <MemberTable
        memberLevel={levelFilter}
        handleFilterMember={handleFilterMember}
        memberItems={memberItems} />
      <DriverDeliveryChart drivers={drivers} />
    </div>
  )
}

export default MemberBox;
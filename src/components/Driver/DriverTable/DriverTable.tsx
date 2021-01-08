import React from 'react';
import MediumBtn from 'components/common/MediumBtn';

import './DriverTable.scss';
import { MemberType } from 'enum/Driver';

interface IDriverTable {
  driverItems: JSX.Element[];
  handleMemberTypeFilter: () => void;
  memberFilterType: MemberType,
}

const DriverTable = ({
  driverItems,
  handleMemberTypeFilter,
  memberFilterType,
}: IDriverTable): JSX.Element => {
  const composeMemberTypeText = (): string | undefined => {
    switch (memberFilterType) {
      case MemberType.ENTIRE:
        return '전체';

      case MemberType.AWAIT:
        return '승인 대기';
    }
  }

  return (
    <div className="DriverTable">
      <div className="DriverTable-Util">
        <MediumBtn
          onClick={handleMemberTypeFilter}
          title={composeMemberTypeText()}
          className='DriverTable-Util-Filter' />
        <div>
          <MediumBtn title='승인' className='DriverTable-Util-Allow' />
          <MediumBtn title='거절' className='DriverTable-Util-Deny' />
        </div>
      </div>

      <table className="DriverTable-Table">
        <thead>
          <tr>
            <th />
            <th>ID</th>
            <th>이름</th>
            <th>승인 상태</th>
            <th>배달 상태</th>
          </tr>
        </thead>

        <tbody>
          {driverItems}
        </tbody>
      </table>
    </div >
  )
}

export default DriverTable;
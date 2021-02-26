import React from 'react';
import MediumBtn from 'components/common/MediumBtn';
import { MemberLevel } from 'enum/Member';

import './MemberTable.scss';

interface IMemberTable {
  driverItems: JSX.Element[],
  customerItems: JSX.Element[],
  handleFilterMember: () => void;
  memberLevel: MemberLevel;
}

const MemberTable = ({
  driverItems,
  customerItems,
  handleFilterMember,
  memberLevel,
}: IMemberTable): JSX.Element => {
  const composeMemberLevelText = () => {
    switch (memberLevel) {
      case MemberLevel.DRIVER:
        return '배송 기사';

      case MemberLevel.CUSTOMER:
        return '고객';

      // no default
    }
  }

  return (
    <div className="MemberTable">
      <div className="MemberTable-Util">
        <MediumBtn
          onClick={handleFilterMember}
          title={composeMemberLevelText()}
          className="MemberTable-Util-Filter" />
      </div>
      {
        memberLevel === MemberLevel.DRIVER ?
          <div className="MemberTable-Wrapper">
            <table className="MemberTable-Wrapper-Table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>이름</th>
                  <th>번호</th>
                  <th>차량 번호</th>
                  <th>차량 용량</th>
                  <th>배송 상태</th>
                </tr>
              </thead>

              <tbody>
                {driverItems}
              </tbody>
            </table>
          </div >
          :
          <div className="MemberTable-Wrapper">
            <table className="MemberTable-Wrapper-Table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>번호</th>
                  <th>주소</th>
                </tr>
              </thead>

              <tbody>
                {customerItems}
              </tbody>
            </table>
          </div >
      }
    </div >
  )
}

export default MemberTable;
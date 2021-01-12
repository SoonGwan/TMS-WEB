import React from 'react';
import { IDriver, IMember } from 'interface/Member';

import './MemberTableItem.scss';
import { MemberLevel } from 'enum/Member';

interface IMemberTableItem {
  member: IMember,
  memberLevel: MemberLevel,
}

const MemberTableItem = ({
  member,
  memberLevel,
}: IMemberTableItem): JSX.Element => {
  const { id, name, address } = member;

  const composeDeliveryStatusLabel = (): JSX.Element | undefined => {
    // Driver가 아닐경우 (Customer일 경우)
    const driver = member as IDriver;
    if (memberLevel !== MemberLevel.DRIVER) {
      return undefined;
    }

    if (driver.is_delivering) {
      return (
        <div className="MemberTableItem-DeliveryStatus-Delivery">
          <span>배송 중</span>
        </div>
      )
    }

    return (
      <div className="MemberTableItem-DeliveryStatus-Await">
        <span>대기 중</span>
      </div>
    )
  }

  return (
    <tr className="MemberTableItem">
      <td>
        <span>{id}</span>
      </td>

      <td>
        <span>{name}</span>
      </td>

      <td>
        <span>{address}</span>
      </td>

      <td>
        {composeDeliveryStatusLabel()}
      </td>
    </tr >
  )
}

export default MemberTableItem;
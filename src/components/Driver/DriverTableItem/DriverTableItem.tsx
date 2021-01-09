import { DeliveryStatus, MemberType } from 'enum/Driver';
import { ISelectableDriver } from 'interface/Member';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai'
import palette from 'styles/palette';
import { parseConfigFileTextToJson } from 'typescript';

import './DriverTableItem.scss';

interface IDriverTableItem {
  driver: ISelectableDriver,
  memberFilterType: MemberType,
  handleSelectChanged: (id: string) => void,
}

const DriverTableItem = ({
  driver,
  memberFilterType,
  handleSelectChanged
}: IDriverTableItem): JSX.Element => {
  const { id, username, allow, delivery_status, selected } = driver;

  const composeDeliveryStatusLabel = (): JSX.Element | undefined => {
    if (allow === false) {
      return undefined;
    }
    switch (delivery_status) {
      case DeliveryStatus.AWAIT:
        return (
          <div className='DriverTableItem-DeliveryStatus-Await'>
            <span>대기 중</span>
          </div>
        )

      case DeliveryStatus.DELIVERY:
        return (
          <div className='DriverTableItem-DeliveryStatus-Delivery'>
            <span>배송 중</span>
          </div>
        )

      // no default
    }
  }

  return (
    <tr className="DriverTableItem">
      <td className="DriverTableItem-CheckBox">
        <input type="checkbox"
          style={{
            visibility: memberFilterType === MemberType.AWAIT ? 'visible' : 'hidden',
          }}
          checked={selected}
          onChange={() => handleSelectChanged(id)} />
      </td>

      <td>
        <span>{id}</span>
      </td>

      <td>
        <span>{username}</span>
      </td>

      <td className="DriverTableItem-AllowStatus">
        <AiOutlineCheckCircle color={allow ? palette.blue_6685A8 : palette.orange_FF6600} />
        <span>{allow ? '승인' : '대기'}</span>
      </td>

      <td>
        {composeDeliveryStatusLabel()}
      </td>
    </tr >
  )
}

export default DriverTableItem;
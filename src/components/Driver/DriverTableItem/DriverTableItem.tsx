import { DeliveryStatus } from 'enum/Driver';
import { ISelectableDriver } from 'interface/Member';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai'

import './DriverTableItem.scss';

interface IDriverTableItem {
  driver: ISelectableDriver,
  handleSelectChanged: (id: string) => void,
}

const DriverTableItem = ({
  driver,
  handleSelectChanged
}: IDriverTableItem): JSX.Element => {
  const { id, username, allow, delivery_status, selected } = driver;

  const composeDeliveryStatus = (): string | undefined => {
    switch (delivery_status) {
      case DeliveryStatus.AWAIT:
        return '대기 중';

      case DeliveryStatus.DELIVERY:
        return '배송 중';

      // no default
    }
  }

  return (
    <tr className="DriverTableItem">
      <td className="DriverTableItem-CheckBox">
        <input type="checkbox"
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
        <AiOutlineCheckCircle />
        <span>{allow ? '승인' : '대기'}</span>
      </td>

      <td>
        <span>{composeDeliveryStatus()}</span>
      </td>
    </tr>
  )
}

export default DriverTableItem;
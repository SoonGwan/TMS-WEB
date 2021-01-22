import { IDriverWithCount } from 'interface/Member';
import React from 'react';
import palette from 'styles/palette';

import './DriverTableItem.scss';

interface IDriverTableItem {
  driver: IDriverWithCount;
}

const DriverTableItem = ({
  driver,
}: IDriverTableItem): JSX.Element => {
  const { id, name, phone, truckName, truckSize, totalCount, completedCount } = driver;

  const composeDeliveryCountLabel = () => {
    if (totalCount === completedCount) {
      return (
        <div className="DriverTableItem-DeliveryCount-Completed">
          <span>{completedCount} / {totalCount}</span>
        </div>
      )
    }

    return (
      <div className="DriverTableItem-DeliveryCount-Delivery">
        <span>{completedCount} / {totalCount}</span>
      </div>
    )
  }

  return (
    <tr className="DriverTableItem">
      <td>
        <span>{id}</span>
      </td>

      <td>
        <span>{name}</span>
      </td>

      <td>
        <span>{phone}</span>
      </td>

      <td>
        <span>{truckName}</span>
      </td>

      <td>
        <span>{truckSize}톤</span>
      </td>

      <td>{composeDeliveryCountLabel()}</td>
    </tr>
  );
};

export default DriverTableItem;

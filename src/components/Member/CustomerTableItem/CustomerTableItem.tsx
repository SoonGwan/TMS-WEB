import { INewCustomerElement } from 'interface/Member';
import React from 'react';

import './CustomerTableItem.scss';

interface ICustomerTableItem {
  customer: INewCustomerElement;
}

const CustomerTableItem = ({
  customer,
}: ICustomerTableItem): JSX.Element => {
  const { name, phone, address } = customer;

  return (
    <tr className="CustomerTableItem">
      <td>
        <span>{name}</span>
      </td>

      <td>
        <span>{phone}</span>
      </td>
      <td>
        <span>{address}톤</span>
      </td>
    </tr>
  );
};

export default CustomerTableItem;

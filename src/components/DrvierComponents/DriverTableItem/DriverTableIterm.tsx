import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai'

import './DriverTableItem.scss';

interface IDriverTableItem {
}

const DriverTableItem = (): JSX.Element => {
  return (
    <tr className="DriverTableItem">
      <td>
        <input type="checkbox" />
      </td>

      <td>
        <span>this_is_driver_id</span>
      </td>

      <td>
        <span>최진우</span>
      </td>

      <td>
        <AiOutlineCheckCircle />
        <span>승인 대기</span>
      </td>

      <td>
        <span>배달 중</span>
      </td>
    </tr>
  )
}

export default DriverTableItem;
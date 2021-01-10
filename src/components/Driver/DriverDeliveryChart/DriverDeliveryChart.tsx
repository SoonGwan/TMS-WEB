import { DeliveryStatus } from 'enum/Driver';
import { ISelectableDriver } from 'interface/Member';
import { PieOptions } from '@antv/g2plot';
import { PieChart } from '@opd/g2plot-react';

import './DriverDeliveryChart.scss';
import palette from 'styles/palette';

interface IDriverDeliveryChart {
  drivers: ISelectableDriver[],
}

const DriverDeliveryChart = ({
  drivers
}: IDriverDeliveryChart) => {
  const awaitDrivers = drivers.filter(driver =>
    driver.delivery_status === DeliveryStatus.AWAIT);

  const deliveryDrivers = drivers.filter(driver =>
    driver.delivery_status === DeliveryStatus.DELIVERY);

  const pieOption: PieOptions = {
    angleField: 'value',
    colorField: 'name',
    animation: false,
    label: {
      style: {
        fontSize: 16,
        fill: palette.blue_6685A8,
      }
    },
    legend: {
      position: 'bottom',
      background: {
        padding: [60, 0, 0, 0],
        style: {
          stroke: null,
        }
      }
    },
    data: [
      {
        name: '대기 중',
        value: awaitDrivers.length,
      },
      {
        name: '배달 중',
        value: deliveryDrivers.length,
      }
    ]
  }

  return (
    <div className="DriverDeliveryChart">
      <div className="DriverDeliveryChart-Title">드라이버 배달 현황</div>
      <div className="DriverDeliveryChart-Wrapper">
        <PieChart {...pieOption} />
      </div>
    </div >
  )
}

export default DriverDeliveryChart;
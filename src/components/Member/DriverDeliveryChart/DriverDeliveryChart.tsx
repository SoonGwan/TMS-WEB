// import { DeliveryStatus } from 'enum/Member';
// import { ISelectableDriver } from 'interface/Member';
import { PieOptions } from '@antv/g2plot';
import { PieChart } from '@opd/g2plot-react';

import './DriverDeliveryChart.scss';
import palette from 'styles/palette';
import { IDriver } from 'interface/Member';

interface IDriverDeliveryChart {
  drivers: IDriver[],
}

const DriverDeliveryChart = ({
  drivers
}: IDriverDeliveryChart) => {
  const deliveringDriverCount = drivers.filter(e => e.is_delivering).length;

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
        value: drivers.length - deliveringDriverCount,
      },
      {
        name: '배달 중',
        value: deliveringDriverCount,
      }
    ]
  }

  return (
    <div className="DriverDeliveryChart">
      <div className="DriverDeliveryChart-Title">기사 배달 현황</div>
      <div className="DriverDeliveryChart-Wrapper">
        <PieChart {...pieOption} />
      </div>
    </div >
  )
}

export default DriverDeliveryChart;
import { DeliveryStatus } from 'enum/Driver';
import { ISelectableDriver } from 'interface/Member';
import { RadarChartPoint, RadialChart } from 'react-vis';
import palette from 'styles/palette';

import './DriverDeliveryChart.scss';

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

  const chartData: RadarChartPoint[] = [
    {
      angle: awaitDrivers.length,
      label: `대기 중  ${awaitDrivers.length}`,
    },
    {
      angle: deliveryDrivers.length,
      label: `배달 중  ${deliveryDrivers.length}`,
    }
  ];

  return (
    <div className="DriverDeliveryChart">
      <div className="DriverDeliveryChart-Title">드라이버 배달 현황</div>
      <RadialChart
        className="DriverDeliveryChart-Chart"
        data={chartData}
        showLabels={true}
        labelsAboveChildren={false}
        labelsStyle={{
          backgroundColor: palette.gray_444444,
        }}
        width={400}
        height={400}>
      </RadialChart>
    </div>
  )
}

export default DriverDeliveryChart;
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import './DeliveryStatusListItemElement.scss';
import palette from 'styles/palette';

interface IDeliveryStatusListItemElement {
  customerIdx: number;
  customerName: string;
  customerAddress: string;
  driverName: string;
  productName: string;
  driverAddress: string;
  endOrderNumber: string;
  customerPhone: string;
  driverPhone: string;
  driverTruckNumber: string;
  driverTruckSize: number;
  endTime: string | null;
}

const DeliveryStatusListItemElement = ({
  customerIdx,
  customerName,
  customerAddress,
  driverName,
  productName,
  driverAddress,
  endOrderNumber,
  customerPhone,
  driverPhone,
  driverTruckNumber,
  driverTruckSize,
  endTime,
}: IDeliveryStatusListItemElement) => {
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: palette.gray_444444,
      color: palette.white_FFFFFF,
      maxWidth: 510,
      // fontSize: theme.typography.pxToRem(12),
      fontSize: '14px',
      border: '1px solid #dadde9',
      padding: '20px',
      borderRadius: '2px',
    },
  }))(Tooltip);

  const shippingState = () => {
    if (endTime === null) {
      return (
        <div className="DeliveryStatusListItemElement-ShippingState-Shipping">
          <span>배송중</span>
        </div>
      );
    }

    return (
      <div className="DeliveryStatusListItemElement-ShippingState-Completion">
        <span>배송완료</span>
      </div>
    );
  };
  // endTime

  const generateTooltipItem = (title: string, content: string | number) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            marginBottom: '2px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontWeight: 'normal',
          }}
        >
          {content}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="DeliveryStatusListItemElement">
        <HtmlTooltip
          placement="bottom-start"
          title={
            <React.Fragment>
              <h3
                style={{
                  marginBottom: '20px',
                }}
              >
                {driverName}
              </h3>

              {generateTooltipItem('전화번호', driverPhone)}
              {generateTooltipItem('트럭번호', driverTruckNumber)}
              {generateTooltipItem('용량', driverTruckSize)}
            </React.Fragment>
          }
        >
          <div className="DeliveryStatusListItemElement-DriverId">
            {driverName}
          </div>
        </HtmlTooltip>
        <HtmlTooltip
          placement="bottom-start"
          title={
            <React.Fragment>
              <h3
                style={{
                  marginBottom: '20px',
                }}
              >
                {customerName}
              </h3>
              {generateTooltipItem('전화번호', customerPhone)}
              {generateTooltipItem('주소', customerAddress)}
            </React.Fragment>
          }
        >
          <div className="DeliveryStatusListItemElement-ClientId">
            {customerName}
          </div>
        </HtmlTooltip>
        <div className="DeliveryStatusListItemElement-StartAddress">
          {customerAddress}
        </div>
        <div className="DeliveryStatusListItemElement-Product">
          {productName}
        </div>
        <div>{shippingState()}</div>
      </div>
    </>
  );
};

export default DeliveryStatusListItemElement;

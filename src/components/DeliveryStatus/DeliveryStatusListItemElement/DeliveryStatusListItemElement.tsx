import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './DeliveryStatusListItemElement.scss';

interface IDeliveryStatusListItemElement {
  customerIdx: number;
  customerName: string;
  customerAddress: string;
  driverIdx: number;
  driverName: string;
  productName: string;
  driverAddress: string;
  endOrderNumber: string;
  customerPhone: string;
  driverPhone: string;
  driverTruckNumber: string;
  driverTruckSize: number;
}

const DeliveryStatusListItemElement = ({
  customerIdx,
  customerName,
  customerAddress,
  driverIdx,
  driverName,
  productName,
  driverAddress,
  endOrderNumber,
  customerPhone,
  driverPhone,
  driverTruckNumber,
  driverTruckSize,
}: IDeliveryStatusListItemElement) => {
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 510,
      // fontSize: theme.typography.pxToRem(12),
      fontSize: '14px',
      border: '1px solid #dadde9',
      borderRadius: '2px',
    },
  }))(Tooltip);

  return (
    <>
      <div className="DeliveryStatusListItemElement">
        <HtmlTooltip
          placement="bottom-start"
          title={
            <React.Fragment>
              <Typography color="inherit">
                {driverName} 드라이버 정보
              </Typography>
              <div>전화번호 : {driverPhone}</div>
              <div>트럭번호 : {driverTruckNumber}</div>
              <div>최대 적재용량 : {driverTruckSize}t</div>
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
              <Typography color="inherit">{customerName} 고객 정보</Typography>
              <div>전화번호 : {customerPhone}</div>
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
      </div>
    </>
  );
};

export default DeliveryStatusListItemElement;

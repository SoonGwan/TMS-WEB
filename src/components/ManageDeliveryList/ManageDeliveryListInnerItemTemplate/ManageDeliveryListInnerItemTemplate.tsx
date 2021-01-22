import React from 'react';
import './ManageDeliveryListInnerItemTemplate.scss';

interface IManageDeliveryListInnerItemTemplate {
  customerIdx: number;
  customerName: string;
  driverId: string;
  driverName: string;
  productName: string;
}

const ManageDeliveryListInnerItemTemplate = ({
  customerIdx,
  customerName,
  driverId,
  driverName,
  productName,
}: IManageDeliveryListInnerItemTemplate) => {
  return (
    <div className="ManageDeliveryListInnerItemTemplate" key={customerIdx}>
      <div className="ManageDeliveryListInnerItemTemplate-Client">
        {customerIdx} ({customerName})
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Driver">
        {driverId} {driverName}
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Product">
        {productName}
      </div>
    </div>
  );
};

export default ManageDeliveryListInnerItemTemplate;

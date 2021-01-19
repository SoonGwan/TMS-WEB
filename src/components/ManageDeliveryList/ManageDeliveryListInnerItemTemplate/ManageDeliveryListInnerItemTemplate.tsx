import React from 'react';
import './ManageDeliveryListInnerItemTemplate.scss';

interface IManageDeliveryListInnerItemTemplate {
  customerIdx: number;
  customerName: string;
  driverIdx: number;
  driverName: string;
  productName: string;
}

const ManageDeliveryListInnerItemTemplate = ({
  customerIdx,
  customerName,
  driverIdx,
  driverName,
  productName,
}: IManageDeliveryListInnerItemTemplate) => {
  return (
    <div className="ManageDeliveryListInnerItemTemplate" key={customerIdx}>
      <div className="ManageDeliveryListInnerItemTemplate-Client">
        {customerIdx} ({customerName})
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Driver">
        {driverIdx} ({driverName})
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Product">
        {productName}
      </div>
    </div>
  );
};

export default ManageDeliveryListInnerItemTemplate;

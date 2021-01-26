import React from 'react';
import './ManageDeliveryListInnerItemTemplate.scss';
import dtil from 'dtil'

interface IManageDeliveryListInnerItemTemplate {
  customerIdx: number;
  customerName: string;
  driverId: string;
  driverName: string;
  productName: string;
  createdAt: Date;
}

const ManageDeliveryListInnerItemTemplate = ({
  customerIdx,
  customerName,
  driverId,
  driverName,
  productName,
  createdAt,
}: IManageDeliveryListInnerItemTemplate) => {
  console.log(createdAt);

  return (
    <div className="ManageDeliveryListInnerItemTemplate" key={customerIdx}>
      <div className="ManageDeliveryListInnerItemTemplate-Client">
        {customerName} ({customerIdx})
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Driver">
        {driverName} ({driverId})
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Product">
        {productName}
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-CreatedAt">
        {dtil(createdAt.toString()).format('yyyy-MM-dd')}
      </div>
    </div>
  );
};

export default ManageDeliveryListInnerItemTemplate;

import React from 'react';
import './ManageDeliveryListInnerItemTemplate.scss';
import dtil from 'dtil'

interface IManageDeliveryListInnerItemTemplate {
  index: number;
  customerIdx: number;
  customerName: string;
  driverId: string;
  driverName: string;
  productName: string;
  createdAt: Date;
  composeSelectBox: (index: number, driverId: string) => JSX.Element;
  // driverOptions: JSX.Element[],
  // handleChangeDriver: () => void,
}

const ManageDeliveryListInnerItemTemplate = ({
  index,
  customerIdx,
  customerName,
  driverId,
  driverName,
  productName,
  createdAt,
  composeSelectBox
}: IManageDeliveryListInnerItemTemplate) => {
  return (
    <div className="ManageDeliveryListInnerItemTemplate" key={customerIdx}>
      <div className="ManageDeliveryListInnerItemTemplate-Client">
        {customerName} ({customerIdx})
      </div>

      <div className="ManageDeliveryListInnerItemTemplate-Driver">
        {composeSelectBox(index, driverId)}
      </div>

      <div className="ManageDeliveryListInnerItemTemplate-Product">
        {productName}
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-CreatedAt">
        {dtil(createdAt.toString()).format('yyyy-MM-dd')}
      </div>
    </div >
  );
};

export default ManageDeliveryListInnerItemTemplate;

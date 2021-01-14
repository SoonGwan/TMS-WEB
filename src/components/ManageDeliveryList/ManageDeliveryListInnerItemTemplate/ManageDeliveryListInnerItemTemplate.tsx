import React from 'react';
import './ManageDeliveryListInnerItemTemplate.scss';

interface IManageDeliveryListInnerItemTemplate {
  id: number;
  fk_client_id: string;
  fk_driver_id: string;
  distance: number;
  start_adress: string;
}

const ManageDeliveryListInnerItemTemplate = ({
  id,
  fk_client_id,
  fk_driver_id,
  distance,
  start_adress,
}: IManageDeliveryListInnerItemTemplate) => {
  return (
    <div className="ManageDeliveryListInnerItemTemplate" key={id}>
      <div className="ManageDeliveryListInnerItemTemplate-Client">
        {fk_client_id}
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Driver">
        {fk_driver_id}
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-Distance">
        {distance}
      </div>
      <div className="ManageDeliveryListInnerItemTemplate-StartAdress">
        {start_adress}
      </div>
    </div>
  );
};

export default ManageDeliveryListInnerItemTemplate;

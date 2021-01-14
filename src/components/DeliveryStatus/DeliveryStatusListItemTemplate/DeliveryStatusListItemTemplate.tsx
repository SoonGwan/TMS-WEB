import { allProductList } from 'atom/DeliveryStatusAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import './DeliveryStatusListItemTemplate.scss';

interface IDeliveryStatusListItemMap {
  id: number;
  fk_client_id: string;
  fk_driver_id: string;
  distance: number;
  start_adress: string;
  staet: number;
}

interface IDeliveryStatusListItemTemplate {
  tableValue: number;
}

const DeliveryStatusListItemTemplate = ({
  tableValue,
}: IDeliveryStatusListItemTemplate) => {
  const product = useRecoilValue(allProductList);
  const filterProduct = product.filter((data) => data.staet === tableValue);

  const productList =
    filterProduct &&
    filterProduct.map((data: IDeliveryStatusListItemMap) => {
      const { id, fk_client_id, fk_driver_id, distance, start_adress } = data;

      return (
        <div className="DeliveryStatusListItemTemplate" key={id}>
          <div className="DeliveryStatusListItemTemplate-DriverId">
            {fk_driver_id}
          </div>
          <div className="DeliveryStatusListItemTemplate-ClientId">
            {fk_client_id}
          </div>
          <div className="DeliveryStatusListItemTemplate-Distance">
            {distance} 킬로미터
          </div>
          <div className="DeliveryStatusListItemTemplate-StartAdress">
            {start_adress}
          </div>
        </div>
      );
    });
  return <>{productList}</>;
};

export default DeliveryStatusListItemTemplate;

import { allProductList } from 'atom/DeliveryStatusAtom';
import { DeliveryTable } from 'enum/DeliveryTable';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { map } from 'underscore';
import './DeliveryStatusListItemTemplate.scss';

interface IDeliveryStatusListItemTemplate {
  tableValue: number;
}

const DeliveryStatusListItemTemplate = ({
  tableValue,
}: IDeliveryStatusListItemTemplate) => {
  const product = useRecoilValue(allProductList);

  const driverList =
    tableValue === DeliveryTable.ALL
      ? product.map((data) => {
          const {
            customerIdx,
            customerName,
            customerAddress,
            driverIdx,
            driverName,
            driverAddress,
            endOrderNumber,
            endTime,
          } = data;
          return (
            <div className="DeliveryStatusListItemTemplate">
              <div className="DeliveryStatusListItemTemplate-DriverId">
                {driverName}({driverIdx})
              </div>
              <div className="DeliveryStatusListItemTemplate-ClientId">
                {customerName}({customerIdx})
              </div>
              <div className="DeliveryStatusListItemTemplate-StartAdress">
                {customerAddress}
              </div>
            </div>
          );
        })
      : tableValue === DeliveryTable.DELIVERING
      ? product
          .filter((element) => element.endTime === null)
          .map((data) => {
            const {
              customerIdx,
              customerName,
              customerAddress,
              driverIdx,
              driverName,
              driverAddress,
              endOrderNumber,
              endTime,
            } = data;

            return (
              <div className="DeliveryStatusListItemTemplate">
                <div className="DeliveryStatusListItemTemplate-DriverId">
                  {driverName}({driverIdx})
                </div>
                <div className="DeliveryStatusListItemTemplate-ClientId">
                  {customerName}({customerIdx})
                </div>
                <div className="DeliveryStatusListItemTemplate-StartAdress">
                  {customerAddress}
                </div>
              </div>
            );
          })
      : tableValue === DeliveryTable.DONE
      ? product
          .filter((element) => element.endTime !== null)
          .map((data) => {
            const {
              customerIdx,
              customerName,
              customerAddress,
              driverIdx,
              driverName,
              driverAddress,
              endOrderNumber,
              endTime,
            } = data;
            return (
              <div className="DeliveryStatusListItemTemplate">
                <div className="DeliveryStatusListItemTemplate-DriverId">
                  {driverName}({driverIdx})
                </div>
                <div className="DeliveryStatusListItemTemplate-ClientId">
                  {customerName}({customerIdx})
                </div>
                <div className="DeliveryStatusListItemTemplate-StartAdress">
                  {customerAddress}
                </div>
              </div>
            );
          })
      : null;

  return <div>{driverList}</div>;
};

export default DeliveryStatusListItemTemplate;

import { Colors, Icon } from '@class101/ui';
import DeliveryListModal from 'components/ManageDeliveryList/DeliveryListModal';
import {
  ICustomerList,
  IDeliveryItem,
  IDriverList,
} from 'interface/ManageDeliveryList';
import React, { useCallback, useEffect, useState } from 'react';
import ManageDeliveryListRepository from 'repository/ManageDeliveryListRepository';
import MemberRepository from 'repository/MemberRepository';
import { ShowToast } from 'util/ShowToast';
import {
  EmptyRequest,
  failedSingleDeliveryCreation,
} from 'validation/ManageDeliveryValidation';

interface IManageDeliveryListModalContainer {
  openModal: () => void;
}
const ManageDeliveryListModalContainer = ({
  openModal,
}: IManageDeliveryListModalContainer) => {
  const [customerList, setCustomerList] = useState<ICustomerList[]>();
  const [driverList, setDriverList] = useState<IDriverList[]>();
  const [driverIdx, setDriverIdx] = useState<string>();
  const [customerIdx, setCustomerIdx] = useState<number>();
  const [product, setProduct] = useState<string>();

  const handleMemberList = useCallback(async () => {
    try {
      const user = await MemberRepository.getCustomers();
      const driver = await MemberRepository.getDrivers();

      const { customers } = user.data.data;
      const { drivers } = driver.data.data;
      console.log(drivers);

      let customerTemp = [{ label: '고객을 선택해주세요.', value: 0 }];
      let driverTemp = [{ label: '드라이버를 선택해주세요.', value: '' }];

      for (let i = 0; i < customers.length; i += 1) {
        const { idx, id, name, address } = customers[i];
        const temp = {
          label: `${name}(${idx})님 ${address}`,
          value: Number(idx),
        };
        customerTemp.push(temp);
      }

      for (let i = 0; i < drivers.length; i += 1) {
        const { idx, id, name, phone } = drivers[i];
        console.log(drivers[i]);

        const temp = {
          label: `${name}(${id}) ${phone}`,
          value: String(id),
        };

        driverTemp.push(temp);
      }

      setCustomerList(customerTemp);
      setDriverList(driverTemp);
    } catch (err) {
      return err;
    }
  }, []);

  const handleSingleDeliveryCreation = useCallback(async () => {
    try {
      const delivery: IDeliveryItem = {
        customerIdx,
        driverId: driverIdx,
        productName: product,
      };

      console.log(delivery);

      if (!EmptyRequest(delivery)) {
        return;
      }

      const data = await ManageDeliveryListRepository.singleDeliveryCreation(
        delivery
      );

      const { status } = data;

      if (status === 200) {
        ShowToast({
          backgroundColor: Colors.green500,
          message: '성공적으로 추가하엿습니다.',
          icon: <Icon.Check fillColor={Colors.white} />,
          timeout: 3000,
        });

        openModal();
        setCustomerIdx(undefined);
        setDriverIdx(undefined);
        setProduct(undefined);
      }
      return data;
    } catch (err) {
      const { status } = err.response;
      failedSingleDeliveryCreation(status);

      return err;
    }
  }, [customerIdx, driverIdx, openModal, product]);

  useEffect(() => {
    handleMemberList();
  }, [handleMemberList]);

  return (
    <DeliveryListModal
      openModal={openModal}
      customerList={customerList}
      driverList={driverList}
      driverIdx={driverIdx}
      setDriverIdx={setDriverIdx}
      customerIdx={customerIdx}
      setCustomerIdx={setCustomerIdx}
      product={product}
      setProduct={setProduct}
      handleSingleDeliveryCreation={handleSingleDeliveryCreation}
    />
  );
};

export default ManageDeliveryListModalContainer;

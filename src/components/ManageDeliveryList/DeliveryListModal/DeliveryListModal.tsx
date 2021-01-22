import { Button, ButtonColor, Icon, Input, Select } from '@class101/ui';
import { ICustomerList, IDriverList } from 'interface/ManageDeliveryList';
import React, { Dispatch, SetStateAction } from 'react';
import './DeliveryListModal.scss';

interface IDeliveryListModal {
  openModal: () => void;
  customerList: ICustomerList[] | undefined;
  driverList: IDriverList[] | undefined;
  driverIdx: string | undefined;
  setDriverIdx: Dispatch<SetStateAction<string | undefined>>;
  customerIdx: number | undefined;
  setCustomerIdx: Dispatch<SetStateAction<number | undefined>>;
  product: string | undefined;
  setProduct: Dispatch<SetStateAction<string | undefined>>;
  handleSingleDeliveryCreation: () => void;
}

const DeliveryListModal = ({
  openModal,
  customerList,
  driverList,
  driverIdx,
  setDriverIdx,
  customerIdx,
  setCustomerIdx,
  product,
  setProduct,
  handleSingleDeliveryCreation,
}: IDeliveryListModal) => {
  return (
    <>
      <div className="Background" onClick={openModal}></div>

      <div className="DeliveryListModal">
        <div className="DeliveryListModal-Input">
          <Select
            options={customerList}
            onChange={(e) => setCustomerIdx(Number(e.target.value))}
          />
          <Select
            options={driverList}
            onChange={(e) => setDriverIdx(e.target.value)}
          />
          <Input
            placeholder="상품명을 입력해주세요."
            value={product}
            onChange={(e: any) => setProduct(e.target.value)}
          />
          <div className="DeliveryListModal-Input-ButtonWrap">
            <Button onClick={openModal}>취소</Button>
            <Button
              color={ButtonColor.ORANGE}
              leftIcon={<Icon.Add />}
              onClick={handleSingleDeliveryCreation}
            >
              추가하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryListModal;

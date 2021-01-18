import React, { useCallback, useEffect, useState } from 'react';
import DeliveryStatus from 'components/DeliveryStatus';
import DeliveryStatusRepository from 'repository/DeliveryStatusRepository';
import { useRecoilState } from 'recoil';
import { allProductList } from 'atom/DeliveryStatusAtom';
import { DeliveryTable } from 'enum/DeliveryTable';

const DeliveryStatusContainer = () => {
  const today = new Date();
  const [, setProductList] = useRecoilState(allProductList);
  const [tableValue, setTableValue] = useState(DeliveryTable.ALL);

  const handleAllProductList = useCallback(async () => {
    const res = await DeliveryStatusRepository.allProductList();
    setProductList(res);
  }, [setProductList]);

  const handleTableValue = useCallback((value: number) => {
    setTableValue(value);
  }, []);

  const tableHeaderText = (tableValue: number) => {
    const tableHeader =
      tableValue === DeliveryTable.ALL ? (
        <div>전체 물류 리스트</div>
      ) : tableValue === DeliveryTable.DELIVERING ? (
        <div>배달중인 리스트</div>
      ) : tableValue === DeliveryTable.DONE ? (
        <div>배송 완료 리스트</div>
      ) : null;

    return tableHeader;
  };

  useEffect(() => {
    handleAllProductList();
  }, [handleAllProductList]);

  return (
    <>
      <DeliveryStatus
        today={today}
        tableValue={tableValue}
        handleTableValue={handleTableValue}
        tableHeaderText={tableHeaderText}
      />
    </>
  );
};

export default DeliveryStatusContainer;

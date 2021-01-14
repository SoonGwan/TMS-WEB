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

  useEffect(() => {
    handleAllProductList();
  }, [handleAllProductList]);

  return (
    <>
      <DeliveryStatus
        today={today}
        tableValue={tableValue}
        handleTableValue={handleTableValue}
      />
    </>
  );
};

export default DeliveryStatusContainer;

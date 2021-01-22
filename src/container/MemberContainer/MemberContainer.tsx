import React, { useCallback, useEffect, useState } from 'react';
import TitleBar from 'components/common/TitleBar';
import { useRecoilState } from 'recoil';
import { CustomerState, DriverState } from 'atom/MemberAtom';
import MemberRepository from 'repository/MemberRepository';
import { MemberLevel } from 'enum/Member';
import MemberTableItem from 'components/Member/DriverTableItem';
import MemberBox from 'components/Member/MemberBox';
import { fetchDriverError } from 'validation/MemberValidation';
import DriverTableItem from 'components/Member/DriverTableItem';
import CustomerTableItem from 'components/Member/CustomerTableItem';

const MemberContainer = (): JSX.Element => {
  const [drivers, setDrivers] = useRecoilState(DriverState);
  const [customers, setCustomers] = useRecoilState(CustomerState);
  const [levelFilter, setLevelFilter] = useState<MemberLevel>(MemberLevel.DRIVER);

  const handleFetchDrivers = useCallback(async () => {
    try {
      const { data } = await MemberRepository.getDrivers();
      const { drivers } = data.data;
      setDrivers(drivers);
    } catch (err) {
      const { status } = err;
      fetchDriverError(status);
    }
  }, [setDrivers]);

  const handleFetchCustomers = useCallback(async () => {
    const { data } = await MemberRepository.getCustomers();
    const { customers } = data.data;
    setCustomers(customers);
  }, [setCustomers]);

  const handleFilterMemberByLevel = useCallback(() => {
    if (levelFilter === MemberLevel.DRIVER) {
      setLevelFilter(MemberLevel.CUSTOMER);
    }
    else if (levelFilter === MemberLevel.CUSTOMER) {
      setLevelFilter(MemberLevel.DRIVER);
    }
  }, [levelFilter]);

  useEffect(() => {
    handleFetchDrivers();
    handleFetchCustomers();
  }, [handleFetchCustomers, handleFetchDrivers])

  const driverItems = drivers.map((driver) => {
    return <DriverTableItem driver={driver} />
  });

  const customerItems = customers.map((customer) => {
    return <CustomerTableItem customer={customer} />
  });

  return (
    <div>
      <TitleBar title='회원 관리' />
      <MemberBox
        drivers={drivers}
        levelFilter={levelFilter}
        driverItems={driverItems}
        customerItems={customerItems}
        handleFilterMember={handleFilterMemberByLevel}
      />
    </div >
  )
}

export default MemberContainer;
import React, { useCallback, useEffect, useState } from 'react';
import { SelectableDriversState } from 'atom/DriverAtom';
import TitleBar from 'components/common/TitleBar';
import { useRecoilState } from 'recoil';
import DriverRepository from 'repository/DriverRepository';
import DriverTableItem from 'components/Driver/DriverTableItem';
import { ISelectableDriver } from 'interface/Member';
import { MemberType } from 'enum/Driver';
import Driver from 'components/Driver/Driver';

const DriverContainer = (): JSX.Element => {
  const [originSelectableDrivers, setOriginSelectableDrivers] = useRecoilState(SelectableDriversState);
  const [memberFilterType, setMemberFilterType] = useState<MemberType>(MemberType.ENTIRE);

  // const selectedDriverIds = selectableDrivers.filter(driver => driver.selected);
  const selectableDrivers = originSelectableDrivers.filter(driver => {
    if (memberFilterType === MemberType.ENTIRE) return driver;
    if (memberFilterType === MemberType.AWAIT) return driver.allow === false;
    return false;
  });

  const handleSetDrivers = useCallback(async () => {
    try {
      const drivers = await DriverRepository.getDrivers();

      const selectableDriversComposer: ISelectableDriver[] = [];
      for (const driver of drivers) {
        selectableDriversComposer.push({
          ...driver,
          selected: false,
        });
      }

      setOriginSelectableDrivers(selectableDriversComposer);
    } catch (err) {
      // TODO: 오류 핸들링
      console.log(err);
    }
  }, [setOriginSelectableDrivers]);

  const handleMemberTypeFilter = useCallback(() => {
    if (memberFilterType === MemberType.ENTIRE) {
      setMemberFilterType(MemberType.AWAIT);
    } else if (memberFilterType === MemberType.AWAIT) {
      setMemberFilterType(MemberType.ENTIRE);
    }
  }, [memberFilterType])

  const handleSelectedChanged = useCallback((id: string) => {
    const driverIndex: number = originSelectableDrivers.findIndex(e => e.id === id);
    if (driverIndex === -1) {
      return;
    }

    const driver: ISelectableDriver = {
      ...originSelectableDrivers[driverIndex],
    }

    driver.selected = !driver.selected;

    const data = [
      ...originSelectableDrivers.slice(0, driverIndex),
      driver,
      ...originSelectableDrivers.slice(driverIndex + 1),
    ]

    setOriginSelectableDrivers(data);
  }, [originSelectableDrivers, setOriginSelectableDrivers]);

  useEffect(() => {
    handleSetDrivers();
  }, [handleSetDrivers]);

  const driverTableItems = selectableDrivers.map((driver, i) => {
    return (
      <DriverTableItem key={i}
        memberFilterType={memberFilterType}
        driver={driver}
        handleSelectChanged={handleSelectedChanged} />
    );
  })

  return (
    <div>
      <TitleBar title='드라이버 관리' />
      <Driver
        drivers={originSelectableDrivers}
        driverItems={driverTableItems}
        memberFilterType={memberFilterType}
        handleMemberTypeFilter={handleMemberTypeFilter} />
    </div >
  )
}

export default DriverContainer;
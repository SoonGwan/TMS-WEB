import React, { useCallback, useEffect, useState } from 'react';
import { SelectableDriversState } from 'atom/DriverAtom';
import TitleBar from 'components/common/TitleBar';
import DriverTable from 'components/Driver/DriverTable';
import { useRecoilState } from 'recoil';
import DriverRepository from 'repository/DriverRepository';
import DriverTableItem from 'components/Driver/DriverTableItem';
import { ISelectableDriver } from 'interface/Member';
import { MemberType } from 'enum/Driver';

const DriverContainer = (): JSX.Element => {
  const [originSelectableDrivers, setOriginSelectableDrivers] = useRecoilState(SelectableDriversState);
  const [selectableDrivers, setSelectableDrivers] = useState<ISelectableDriver[]>([]);
  const [memberFilterType, setMemberFilterType] = useState<MemberType>(MemberType.ENTIRE);

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
      setSelectableDrivers(selectableDriversComposer);
    } catch (err) {
      // TODO: 오류 핸들링
      console.log(err);
    }
  }, [setOriginSelectableDrivers]);

  const handleMemberTypeFilter = useCallback(() => {
    if (memberFilterType === MemberType.ENTIRE) {
      setSelectableDrivers(originSelectableDrivers.filter(driver => driver.allow === false));
      setMemberFilterType(MemberType.AWAIT);
    } else if (memberFilterType === MemberType.AWAIT) {
      setSelectableDrivers(originSelectableDrivers);
      setMemberFilterType(MemberType.ENTIRE);
    }
  }, [memberFilterType, originSelectableDrivers])

  const handleSelectedChanged = useCallback((id: string) => {
    const driverIndex: number = selectableDrivers.findIndex(e => e.id === id);
    if (driverIndex === -1) {
      return;
    }

    const driver: ISelectableDriver = {
      ...selectableDrivers[driverIndex],
    }

    driver.selected = !driver.selected;

    const data = [
      ...selectableDrivers.slice(0, driverIndex),
      driver,
      ...selectableDrivers.slice(driverIndex + 1),
    ]

    setSelectableDrivers(data);
  }, [selectableDrivers]);

  useEffect(() => {
    handleSetDrivers();
  }, [handleSetDrivers]);

  const driverTableItems = selectableDrivers.map((driver, i) => {
    return (
      <DriverTableItem key={i}
        driver={driver}
        handleSelectChanged={handleSelectedChanged} />
    );
  })

  const selectedDriverIds = selectableDrivers.filter(driver => driver.selected);

  return (
    <div>
      <TitleBar title='드라이버 관리' />
      {selectedDriverIds.length}
      <DriverTable
        driverItems={driverTableItems}
        memberFilterType={memberFilterType}
        handleMemberTypeFilter={handleMemberTypeFilter} />
    </div>
  )
}

export default DriverContainer;
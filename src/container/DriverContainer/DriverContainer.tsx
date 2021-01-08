import React, { useCallback, useEffect } from 'react';
import { SelectableDriversState } from 'atom/DriverAtom';
import TitleBar from 'components/common/TitleBar';
import DriverTable from 'components/Driver/DriverTable';
import { useRecoilState } from 'recoil';
import DriverRepository from 'repository/DriverRepository';
import DriverTableItem from 'components/Driver/DriverTableItem';
import { ISelectableDriver } from 'interface/Member';

const DriverContainer = (): JSX.Element => {
  const [selectableDrivers, setSelectableDrivers] = useRecoilState(SelectableDriversState);

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

      setSelectableDrivers(selectableDriversComposer);
    } catch (err) {
      // TODO: 오류 핸들링
      console.log(err);
    }
  }, [setSelectableDrivers]);

  const handleSelectedChanged = (id: string) => {
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
  }

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
      <DriverTable driverItems={driverTableItems} />
    </div>
  )
}

export default DriverContainer;
import { ISelectableDriver } from 'interface/Member';
import { atom, RecoilState } from 'recoil';

export const SelectableDriversState: RecoilState<ISelectableDriver[]> = atom({
  key: 'DriverState',
  default: [] as ISelectableDriver[],
});
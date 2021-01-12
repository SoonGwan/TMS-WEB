import { IDriver, IMember } from 'interface/Member';
import { atom, RecoilState } from 'recoil';

export const DriverState: RecoilState<IDriver[]> = atom({
  key: 'DriverState',
  default: [] as IDriver[],
});

export const CustomerState: RecoilState<IMember[]> = atom({
  key: 'CustomerState',
  default: [] as IMember[],
})
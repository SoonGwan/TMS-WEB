import { IDriver, IDriverWithCount, IMember, INewCustomerElement, INewDriverElement } from 'interface/Member';
import { atom, RecoilState } from 'recoil';

export const DriverState: RecoilState<IDriverWithCount[]> = atom({
  key: 'DriverState',
  default: [] as IDriverWithCount[],
});

export const CustomerState: RecoilState<INewCustomerElement[]> = atom({
  key: 'CustomerState',
  default: [] as INewCustomerElement[],
})
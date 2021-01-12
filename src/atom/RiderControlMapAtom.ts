import { IDriverDeliveryState } from 'interface/Map';
import { atom, RecoilState } from 'recoil';

export const DriverDeliveryState: RecoilState<IDriverDeliveryState[]> = atom({
  key: 'DriverDeliveryState',
  default: [] as IDriverDeliveryState[],
});

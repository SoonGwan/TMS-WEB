import {
  IDriverCompleted,
  IDriverCompletedCustom,
} from 'interface/DeliveryStatus';
import { atom, RecoilState } from 'recoil';

export const allProductList: RecoilState<IDriverCompletedCustom[]> = atom({
  key: 'allProductList',
  default: [] as IDriverCompletedCustom[],
});

export const trackingInfoModal = atom({
  key: 'trackingInfoModal',
  default: false,
});

export const deliveriesList = atom({
  key: 'deliveries',
  default: [] as IDriverCompleted[],
});

import { atom, RecoilState } from 'recoil';

export const allProductList: RecoilState<any[]> = atom({
  key: 'allProductList',
  default: [] as any[],
});

export const trackingInfoModal = atom({
  key: 'trackingInfoModal',
  default: false,
});

export const deliveriesList = atom({
  key: 'deliveries',
  default: [] as any[],
});

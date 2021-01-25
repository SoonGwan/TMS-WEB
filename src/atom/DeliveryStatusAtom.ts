import { atom, RecoilState } from 'recoil';

export const allProductList: RecoilState<any[]> = atom({
  key: 'allProductList',
  default: [] as any[],
});

export const testAtom = atom({
  key: 'default',
  default: false,
});

export const deliveriesList = atom({
  key: 'deliveries',
  default: [] as any[],
});

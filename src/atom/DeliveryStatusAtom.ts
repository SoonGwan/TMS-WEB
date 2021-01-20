import { atom, RecoilState } from 'recoil';

export const allProductList: RecoilState<any[]> = atom({
  key: 'allProductList',
  default: [] as any[],
});

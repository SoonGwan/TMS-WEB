import { IAllProductList } from 'interface/DeliveryStatus';
import { atom, RecoilState } from 'recoil';

export const allProductList: RecoilState<IAllProductList[]> = atom({
  key: 'allProductList',
  default: [] as IAllProductList[],
});

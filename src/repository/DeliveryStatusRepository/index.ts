import { IAllProductList } from 'interface/DeliveryStatus';

class DeliveryStatusRepository {
  async allProductList(): Promise<IAllProductList[]> {
    const productList: IAllProductList[] = [];

    for (let i = 0; i < 10; i++) {
      let status = i % 3;

      productList.push({
        id: i,
        fk_client_id: `홍길동${i}`,
        fk_driver_id: `쿠팡맨 ${i}`,
        distance: Math.floor(Math.random() * 100),
        start_adress: `내가 그걸 어케아는떼!${Math.random()}`,
        staet: status,
      });
    }

    return productList;
  }
}

export default new DeliveryStatusRepository();

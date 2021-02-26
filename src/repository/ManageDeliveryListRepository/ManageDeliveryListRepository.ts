import { IDeliveryItem } from 'interface/ManageDeliveryList';
import { postRequest } from 'util/Axios';
import { getToken } from 'util/Token';

class ManageDeliveryListRepository {
  deliveryCreation = async (delivery: IDeliveryItem[]) => {
    const data = await postRequest({
      url: '/delivery',
      request: { deliveries: delivery },
      token: getToken(),
    });

    return data;
  };

  singleDeliveryCreation = async (delivery: IDeliveryItem) => {
    const data = await postRequest({
      url: '/delivery/single',
      request: delivery,
      token: getToken(),
    });

    return data;
  };
}

export default new ManageDeliveryListRepository();

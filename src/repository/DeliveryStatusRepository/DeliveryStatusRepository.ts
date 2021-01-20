import { getRequest } from 'util/Axios';
import { getToken } from 'util/Token';

class DeliveryStatusRepository {
  deliveryList = async (date: string) => {
    const data = await getRequest({
      url: `/delivery?date=${date}`,
      token: getToken(),
    });

    return data;
  };

  trackingForDriver = async (idx: number) => {
    const data = await getRequest({
      url: `/delivery/driver/completed/${idx}`,
      token: getToken(),
    });

    return data;
  };
}

export default new DeliveryStatusRepository();

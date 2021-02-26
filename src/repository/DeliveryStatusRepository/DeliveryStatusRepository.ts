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

  trackingForDriver = async (id: string) => {
    const data = await getRequest({
      url: `/delivery/driver/completed/${id}`,
      token: getToken(),
    });

    return data;
  };

  driverDistance = async (id: string | undefined) => {
    const { data } = await getRequest({
      url: `/delivery/driver/distance/${id}`,
      token: getToken(),
    });

    return data;
  };
}

export default new DeliveryStatusRepository();

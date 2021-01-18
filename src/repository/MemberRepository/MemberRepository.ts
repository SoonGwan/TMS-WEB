import { getRequest } from 'util/Axios'
import { getToken } from 'util/Token';

class MemberRepository {
  getDrivers = async () => {
    const data = await getRequest({
      url: '/user/driver',
      token: getToken(),
    });

    return data;
  }

  getCustomers = async () => {
    const data = await getRequest({
      url: '/user/customer',
      token: getToken(),
    });

    return data;
  }
}

export default new MemberRepository();
import { postRequest } from 'util/Axios';
import { ILoginTypes } from 'interface/Auth';

class AuthRepository {
  getAuthLogin = async (req: ILoginTypes) => {
    const data = await postRequest({
      url: '/auth/login/manager',
      request: req,
    });

    return data;
  };
}

export default new AuthRepository();

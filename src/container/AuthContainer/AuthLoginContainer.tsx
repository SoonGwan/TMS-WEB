import React, { useState } from 'react';
import AuthLogin from 'components/Auth';
import AuthRepository from 'repository/AuthRepository';
import {
  loginError,
  loginTrimCheck,
  successLogin,
} from 'validation/AuthValidation';
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IAuthLoginContainer extends RouteComponentProps {
  history: History;
}

const AuthLoginContainer = ({ history }: IAuthLoginContainer) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const handleGetAuthLogin = async () => {
    try {
      const req = {
        id,
        password: pw,
      };

      if (!loginTrimCheck(req)) {
        return;
      }

      const res = await AuthRepository.getAuthLogin(req);

      const {
        status,
        data: { data },
      } = res;

      const token = data['x-access-token'];

      if (status === 200 && token) {
        successLogin();
        if (isAutoLogin) {
          localStorage.setItem('x-access-token', token);
          sessionStorage.removeItem('x-access-token');

          history.push('/');
        } else {
          sessionStorage.setItem('x-access-token', token);
          localStorage.removeItem('x-access-token');

          history.push('/');
        }
      }
    } catch (err) {
      const { status } = err.response;
      loginError(status);

      localStorage.removeItem('x-access-token');
      sessionStorage.removeItem('x-access-token');
    }
  };
  return (
    <AuthLogin
      id={id}
      setId={setId}
      pw={pw}
      setPw={setPw}
      handleGetAuthLogin={handleGetAuthLogin}
      isAutoLogin={isAutoLogin}
      setIsAutoLogin={setIsAutoLogin}
    />
  );
};

export default withRouter(AuthLoginContainer);

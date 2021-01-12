import React, { useState } from 'react';
import AuthLogin from 'components/Auth/AuthLogin';
import AuthRepository from 'repository/AuthRepository';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const AuthLoginContainer = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const handleGetAuthLogin = async () => {
    const data = {
      id,
      pw,
    };
    try {
      const res = await AuthRepository.getAuthLogin(data);
      if (isAutoLogin) {
        localStorage.setItem('x-access-token', res.data['x-access-token']);
        // history.push();
      } else {
        sessionStorage.setItem('x-access-token', res.data['x-access-token']);
        // history.push();
      }
    } catch (err) {
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

export default AuthLoginContainer;

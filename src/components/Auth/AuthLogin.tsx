import React from 'react';
import './AuthLogin.scss';
import palette from 'styles/palette';
import RadioButton from 'components/common/RadioButton/RadioButton';
import WideInputBox from 'components/common/WideInputBox';
import WideButton from 'components/common/WideButton/WideButton';

const AuthLogin = () => {
  return (
    <div className="AuthLogin">
      <div className="AuthLogin-Wrapper">
        <div className="AuthLogin-Wrapper-Title">관리자 로그인</div>
        <div className="AuthLogin-InputWrapper">
          <WideInputBox
            className="AuthLogin-InputWrapper-Input"
            type="text"
            placeholder="id"
          />
          <WideInputBox
            className="AuthLogin-InputWrapper-Input"
            type="password"
            placeholder="pw"
          />
        </div>
        <div className="AuthLogin-ButtonWrap">
          <WideButton
            className="AuthLogin-ButtonWrap-Button"
            text="로그인"
            fontSize="24px"
            fontColor={palette.white_FFFFFF}
          />
          <div className="AuthLogin-PureRadio">
            <RadioButton labelText={'자동 로그인'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;

import React, { SetStateAction, Dispatch } from 'react';
import './AuthLogin.scss';
import palette from 'styles/palette';
import RadioButton from 'components/common/RadioButton/RadioButton';
import WideInputBox from 'components/common/WideInputBox';
import WideButton from 'components/common/WideButton/WideButton';

interface IAuthLogin {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  pw: string;
  setPw: Dispatch<SetStateAction<string>>;
  handleGetAuthLogin: () => void;
  isAutoLogin: boolean;
  setIsAutoLogin: Dispatch<SetStateAction<boolean>>;
}

const AuthLogin = ({
  id,
  setId,
  pw,
  setPw,
  handleGetAuthLogin,
  isAutoLogin,
  setIsAutoLogin,
}: IAuthLogin) => {
  return (
    <div className="AuthLogin">
      <div className="AuthLogin-Wrapper">
        <div className="AuthLogin-Wrapper-Title">관리자 로그인</div>
        <div className="AuthLogin-InputWrapper">
          <WideInputBox
            className="AuthLogin-InputWrapper-Input"
            type="text"
            placeholder="id"
            inputValue={id}
            setInputValue={setId}
          />
          <WideInputBox
            className="AuthLogin-InputWrapper-Input"
            type="password"
            placeholder="pw"
            inputValue={pw}
            setInputValue={setPw}
          />
        </div>
        <div className="AuthLogin-ButtonWrap">
          <WideButton
            className="AuthLogin-ButtonWrap-Button"
            text="로그인"
            fontSize="24px"
            fontColor={palette.white_FFFFFF}
            buttonClick={handleGetAuthLogin}
          />
          <div className="AuthLogin-PureRadio">
            <RadioButton
              labelText={'자동 로그인'}
              labelValue={isAutoLogin}
              setLabelValue={setIsAutoLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;

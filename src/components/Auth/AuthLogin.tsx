import React from 'react';
import './AuthLogin.scss';
import PureInput from 'components/common/PureLayout/PureInput';
import palette from 'styles/palette';
import PureButton from 'components/common/PureLayout/PureButton/PureButton';
import PureRadio from 'components/common/PureLayout/PureRadio/PureRadio';

const AuthLogin = () => {
  return (
    <div className="AuthLogin">
      <div className="AuthLogin-Wrapper">
        <div className="AuthLogin-Wrapper-Title">관리자 로그인</div>
        <div className="AuthLogin-InputWrapper">
          <PureInput
            width={'100%'}
            height={'7.03vh'}
            borderColor={palette.blue_E2E8F1}
            type={'text'}
            borderPx={1}
            borderRadius={5}
            placeholder={'id'}
          />
          <PureInput
            width={'100%'}
            height={'7.03vh'}
            borderColor={palette.blue_E2E8F1}
            type={'password'}
            borderPx={1}
            borderRadius={5}
            placeholder={'password'}
          />
        </div>
        <div className="AuthLogin-ButtonWrap">
          <PureButton
            width={'100%'}
            height={'100%'}
            backgroundColor={palette.blue_E2E8F1}
            borderRadius={0}
            fontSize={'28px'}
            fontColor={palette.white_FFFFFF}
            text={'로그인'}
            border={'none'}
          />
          <div className="AuthLogin-PureRadio">
            <PureRadio labelText={'자동로그인'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;

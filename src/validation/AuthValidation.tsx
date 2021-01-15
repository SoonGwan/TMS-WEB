import { ILoginError, ILoginTrimCheck } from 'interface/AuthValidation';
import { ShowToast } from 'util/ShowToast';
import { Colors, Icon } from '@class101/ui';

export const loginTrimCheck = (request: ILoginTrimCheck) => {
  const { id, password } = request;
  if (id.trim().length <= 0 || password.trim().length <= 0) {
    ShowToast({
      backgroundColor: Colors.redError,
      message: '빈 칸 없이 입력해주세요.',
      timeout: 3000,
      icon: <Icon.CheckCircle fillColor={Colors.white} />,
    });

    return false;
  }
  return true;
};

export const successLogin = () => {
  ShowToast({
    backgroundColor: Colors.green500,
    message: '환영합니다.',
    icon: <Icon.CheckCircle fillColor={Colors.white} />,
    timeout: 3000,
  });
};

export const loginError = (status: number) => {
  let errorMessage: string = '';

  if (status === 401) errorMessage = '인증 실패';
  else if (status === 500) errorMessage = '서버 오류';

  ShowToast({
    backgroundColor: Colors.redError,
    message: errorMessage,
    icon: <Icon.CheckCircle fillColor={Colors.white} />,
    timeout: 3000,
  });
};

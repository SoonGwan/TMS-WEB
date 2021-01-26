import { ShowToast } from 'util/ShowToast';
import { Colors, Icon } from '@class101/ui';
import { IDeliveryItem } from 'interface/ManageDeliveryList';

export const successUploadProduct = (status: number) => {
  ShowToast({
    backgroundColor: Colors.green500,
    message: '성공적으로 추가하였습니다.',
    icon: <Icon.CheckCircle fillColor={Colors.white} />,
    timeout: 3000,
  });
};

export const failedUploadProduct = (status: number | string) => {
  if (typeof status === 'string') {
    ShowToast({
      backgroundColor: Colors.redError,
      message: status,
      icon: <Icon.Alert fillColor={Colors.white} />,
      timeout: 3000,
    });
    return;
  }

  let errorMessage = '';
  if (status === 400) errorMessage = '엑셀에 값이 누락되었습니다.';
  else if (status === 401) errorMessage = '인증이 되지 않았습니다.';
  else if (status === 410) errorMessage = '토큰이 만료되었습니다.';
  else if (status === 500) errorMessage = '서버 오류';

  ShowToast({
    backgroundColor: Colors.redError,
    message: errorMessage,
    icon: <Icon.Alert fillColor={Colors.white} />,
    timeout: 3000,
  });
};

export const EmptyArray = () => {
  ShowToast({
    backgroundColor: Colors.redError,
    message: '추가후 업로드 해주세요.',
    icon: <Icon.Alert fillColor={Colors.white} />,
    timeout: 3000,
  });
};

export const EmptyRequest = (delivery: IDeliveryItem) => {
  const { customerIdx, driverId, productName } = delivery;

  if (!customerIdx || !driverId || !productName) {
    ShowToast({
      backgroundColor: Colors.redError,
      message: '비어있는 값이 있습니다.',
      icon: <Icon.Alert fillColor={Colors.white} />,
      timeout: 3000,
    });

    return false;
  }

  return true;
};

export const failedSingleDeliveryCreation = (status: number) => {
  let errorMessage = '';
  if (status === 401) errorMessage = '인증이 되지 않았습니다.';
  else if (status === 410) errorMessage = '토큰이 만료되었습니다.';

  ShowToast({
    backgroundColor: Colors.redError,
    message: errorMessage,
    icon: <Icon.Alert fillColor={Colors.white} />,
    timeout: 3000,
  });
};

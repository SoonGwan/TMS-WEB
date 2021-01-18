import { Colors, Icon } from '@class101/ui';
import React from 'react';
import { ShowToast } from 'util/ShowToast';

export const fetchDriverError = (status: number) => {
  ShowToast({
    backgroundColor: Colors.redError,
    message: '다시 시도해주세요',
    icon: <Icon.CheckCircle fillColor={Colors.white} />,
    timeout: 3000,
  });
}
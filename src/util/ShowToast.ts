import { Toaster, ToastProps } from '@class101/ui';

export const ShowToast = async (props: ToastProps) => {
  let AppToaster;

  if (!AppToaster) {
    AppToaster = await Toaster.create();
  }

  AppToaster.show(props);
};

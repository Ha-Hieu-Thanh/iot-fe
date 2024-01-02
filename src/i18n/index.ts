import { message } from 'antd';
import configs from '../constants/config';

export const handleErrorMessage = (error: any) => {
  message.destroy();
  message.error(getErrorMessage(error));
  if (configs.APP_ENV !== 'prod') {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.errorMessage || 'Something went wrong!';
};

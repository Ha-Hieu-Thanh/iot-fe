import { sendGet } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getListTask = (params: any) => sendGet('/task/list-task', params);

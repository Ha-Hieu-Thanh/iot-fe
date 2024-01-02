import { sendGet, sendPut } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getProfile = () => sendGet('/member/profile').then((res) => res.data);
export const updateProfile = () => sendPut('/v1/app/profile');

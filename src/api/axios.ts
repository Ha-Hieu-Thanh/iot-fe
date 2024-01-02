import Axios from "axios";
import configs from "constants/config";
import Cookies from "js-cookie";
import { logout } from "utils/helper/authentication";

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    // eslint-disable-next-line no-param-reassign
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const originalConfig = error.config;
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();
      return Promise.reject(error);
    }
    return Axios.post(`${configs.API_DOMAIN}/auth/refresh-token`, {
      refreshToken,
    })
      .then((res: any) => {
        console.log(res);
        if (res.status === 201) {
          const data = res.data;
          console.log(data);
          Cookies.set("token", data.accessToken);
          Cookies.set("refreshToken", data.refreshToken);
          originalConfig.headers.Authorization = `Bearer ${data.accessToken}`;
          return Axios(originalConfig);
        } else {
          logout();
          return Promise.reject(error);
        }
      })
      .catch(() => {
        logout();
        return Promise.reject(error);
      });
  }
);

export const sendGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res.data);
export const sendPut = (url: string, params?: any) =>
  axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) =>
  axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { params }).then((res) => res.data);

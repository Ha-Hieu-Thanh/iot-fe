import { sendDelete, sendGet, sendPost } from "./axios";

export const getSubcription = () => sendGet("/subcription");
export const subcribe = (params: any) => sendPost(`/subcription/${params}`);
export const unSubscribe = (params: any) =>
  sendDelete(`/subcription/${params}`);

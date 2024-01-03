import { sendGet } from "./axios";
export const getData = (params:any) => sendGet("/data",params);
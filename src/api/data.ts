import { send } from "process";
import { sendGet } from "./axios";
export const getData = (params:any) => sendGet("/data",params);
export const getLocationData = () => sendGet("location");
export const getAqiData = (params:any) => sendGet("/data/aqi",params);
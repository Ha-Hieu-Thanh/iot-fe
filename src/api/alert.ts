import { sendGet } from "./axios";

export const getAlerts = (params: any) => sendGet("/alert", params);

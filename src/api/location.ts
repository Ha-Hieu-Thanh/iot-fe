import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getLocation = () => sendGet("/location");
export const getLocationByUser = () => sendGet("/location/user");
export const createLocation = (params: any) => sendPost("/location", params);
export const updateLocation = (id: number, params: any) =>
  sendPut(`/location/${id}`, params);
export const deleteLocation = (id: number) => sendDelete(`/location/${id}`);
export const getUserByLocation = (id: number) => sendGet(`/location/${id}`);

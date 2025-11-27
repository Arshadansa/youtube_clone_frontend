import { apiGet, apiPost } from "./http";

export const toggleSubscribe = (channelId) =>
  apiPost(`/subscribers/c/${channelId}`);

export const getSubscriberList = (channelId) =>
  apiGet(`/subscribers/c/${channelId}`);

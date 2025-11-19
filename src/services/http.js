import api from "./axois";

export const apiGet = async (url, params = {}) => {
  const res = await api.get(url, { params });
  return res.data;
};

export const apiPost = async (url, body = {}) => {
  const res = await api.post(url, body);
  return res.data;
};

export const apiPatch = async (url, body = {}) => {
  const res = await api.patch(url, body);
  return res.data;
};

export const apiPut = async (url, body = {}) => {
  const res = await api.put(url, body);
  return res.data;
};

export const apiDelete = async (url) => {
  const res = await api.delete(url);
  return res.data;
};

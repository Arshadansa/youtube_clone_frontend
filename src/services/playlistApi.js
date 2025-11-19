import { apiGet, apiPost, apiDelete, apiPatch } from "./http";

export const getMyPlaylist = () =>
  apiGet("/playList/user/690f0b3fd386a34c179a680b");

export const getSinglePlaylist = (id) => apiGet(`/playList/${id}`);

export const createPlaylist = (data) => apiPost("/playList", data);

export const updatePlaylist = (id, data) => apiPatch(`/playList/${id}`, data);

export const deletePlaylist = (id) => apiDelete(`/playList/${id}`);

export const addVideoToPlaylist = (videoId, playlistId) =>
  apiPatch(`/playList/add/${videoId}/${playlistId}`);

export const removeVideoFromPlaylist = (videoId, playlistId) =>
  apiPatch(`/playList/remove/${videoId}/${playlistId}`);

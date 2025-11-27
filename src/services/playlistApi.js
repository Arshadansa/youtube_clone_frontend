import { apiGet, apiPost, apiDelete, apiPatch } from "./http";

export const getMyPlaylist = (id) => apiGet(`/playList/user/${id}`);

export const getSinglePlaylist = (id) => apiGet(`/playList/${id}`);

export const createPlaylist = (data) => apiPost("/playList", data);

export const updatePlaylist = (id, data) => apiPatch(`/playList/${id}`, data);

export const deletePlaylist = (id) => apiDelete(`/playList/${id}`);

export const addVideoToPlaylist = (videoId, playlistId) =>
  apiPatch(`/playList/add/${videoId}/${playlistId}`);

export const removeVideoFromPlaylist = (videoId, playlistId) =>
  apiPatch(`/playList/remove/${videoId}/${playlistId}`);

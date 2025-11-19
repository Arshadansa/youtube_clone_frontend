import { apiGet, apiPost, apiDelete, apiPatch } from "./http";

export const getMyVideos = () => apiGet("/videos");

export const uploadVideo = (data) => apiPost("/videos/", data);

export const deleteVideo = (id) => apiDelete(`/videos/${id}`);

export const editVideo = (id, data) => apiPatch(`/videos/${id}`, data);

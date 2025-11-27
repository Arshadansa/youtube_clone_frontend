import { apiGet, apiPost } from "./http";

export const toggleLike = (id) => apiPost(`/likes/toggle/v/${id}`);

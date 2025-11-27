import { apiGet,apiPost } from "./http";


export const addComment = (id, body) => apiPost(`/comments/${id}`, body);

export const fetchComments =(id)=>apiGet(`/comments/${id}`)
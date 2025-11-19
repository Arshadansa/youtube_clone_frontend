// src/context/VideoContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getMyVideos,
  deleteVideo as deleteVideoApi,
  editVideo as editVideoApi,
} from "../services/videoApi";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const VideoContext = createContext();

export default function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const { user, loading } = useAuth();
  const [error, setError] = useState(null);

  // Fetch all uploaded videos
  const fetchVideos = async () => {
    try {
      if (loading) return;
      if (!user) return;
      const response = await getMyVideos();
      setVideos(response?.data?.videos || []);
      setError(null);
    } catch (err) {
      const backendMsg = err?.response?.data?.message || "Something went wrong";
      setError(backendMsg);
    } finally {
      setLoadingVideo(false);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, [user]);
// Delete a video
  const deleteVideo = async (id) => {
    try {
      if (loading) return;
      if (!user) return;
      const response = await deleteVideoApi(id);
      fetchVideos();
      toast.success("video deleted successfully");
    } catch (error) {
      setError("Failed to fetch videos");
      toast.error("video can not be deleted");
    } finally {
      setLoadingVideo(false);
    }
  };
// update a video
const editVideo = async (id, data) => {
  try {
    if (loading) return;
    if (!user) return;
    const response = await editVideoApi(id, data);
    fetchVideos();
    toast.success("video edited successfully");
  } catch (error) {
    setError("Failed to fetch videos");
    toast.error("video can not be edited");
  } finally {
    setLoadingVideo(false);
  }
}; 

  return (
    <VideoContext.Provider
      value={{
        videos,
        loading,
        error,
        deleteVideo,
        editVideo,
        refreshVideos: fetchVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

// Custom hook
export const useVideos = () => useContext(VideoContext);

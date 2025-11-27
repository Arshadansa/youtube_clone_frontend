// src/context/VideoContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getMyVideos,
  getUserVideos as getUserVideosApi,
  deleteVideo as deleteVideoApi,
  editVideo as editVideoApi,
  getSingleVideo as getSingleVideoApi,
} from "../services/videoApi";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const VideoContext = createContext();

export default function VideoProvider({ children }) {
  const [videos, setVideos] = useState([]);
  const [singleVideos, setSingleVideos] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const { user, loading } = useAuth();
  const [error, setError] = useState(null);
  const [userVideo, setUserVideo] = useState([]);
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
      if (loading || !user) return;
      await deleteVideoApi(id);
      setVideos((prev) => prev.filter((video) => video._id !== id));
      setCurrentVideo((prev) => (prev?._id === id ? null : prev));
      toast.success("Video Deleted Successfully");
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message || "Failed to delete video";
      setError(backendMsg);
      toast.error("Video cannot be deleted");
    }
  };

  // update a video
  const editVideo = async (id, data) => {
    try {
      if (loading) return;
      if (!user) return;
      const response = await editVideoApi(id, data);
      fetchVideos();
      toast.success("Video Edited Successfully");
    } catch (error) {
      setError("Failed to fetch videos");
      toast.error("video can not be edited");
    } finally {
      setLoadingVideo(false);
    }
  };

  const getSingleVideo = async (id) => {
    try {
      if (loading || !user) return;
      const response = await getSingleVideoApi(id);
      const video = response?.data || null;
      setSingleVideos(video);
      setCurrentVideo(video);
      setError(null);
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message || "Something went wrong";
      setError(backendMsg);
    } finally {
      setLoadingVideo(false);
    }
  };

  // for user videos
  const getUserVideos = async (id) => {
    try {
      if (loading || !user) return;
      const response = await getUserVideosApi(id);
      setUserVideo(response.data);
      setError(null);
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message || "Something went wrong";
      setError(backendMsg);
    } finally {
      setLoadingVideo(false);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        loading,
        loadingVideo,
        singleVideos,
        currentVideo,
        userVideo,
        getUserVideos,
        setUserVideo,
        setCurrentVideo,
        error,
        deleteVideo,
        editVideo,
        getSingleVideo,
        refreshVideos: fetchVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

// Custom hook
export const useVideos = () => useContext(VideoContext);

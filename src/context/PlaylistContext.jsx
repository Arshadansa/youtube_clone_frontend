import { createContext, useContext, useEffect, useState } from "react";
import {
  getMyPlaylist as getMyPlaylistApi,
  updatePlaylist as updatePlaylistApi,
  deletePlaylist as deletePlaylistApi,
  addVideoToPlaylist as addVideoToPlaylistApi,
  getSinglePlaylist as getMySinglePlaylistApi,
  removeVideoFromPlaylist as removeVideoFromPlaylistApi,
} from "../services/playlistApi";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { ConfirmNotify } from "../ui";

const PlaylistContext = createContext();

export default function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [playlistSingle, setPlaylistSingle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();
  const [singlePlaylist, setSinglePlaylist] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const getMyPlaylist = async (id) => {
    try {
      if (authLoading) return;
      if (!user) return;
      setLoading(true);
      const response = await getMyPlaylistApi(id);
      setPlaylists(response?.data || []);
      setError(null);
    } catch (err) {
     if (err.response?.data) {
      setError(err.response.data.message);
      setPlaylists([]); 
    } else {
      setError(err.message || "Something went wrong");
    }
    } finally {
      setLoading(false);
    }
  };



  const getSinglePlaylist = async (playlistId) => {
    try {
      if (authLoading) return;
      if (!user) return;
      setLoading(true);
      const response = await getMySinglePlaylistApi(playlistId);
      setSinglePlaylist(response.data);
      if (response.data?.videos?.length > 0) {
        setCurrentVideo(response.data.videos[0]);
      }

      setError(null);
    } catch (err) {
      setError("Failed to fetch playlist");
    } finally {
      setLoading(false);
    }
  };

  // Delete locally
  const deletePlaylistLocally = (id) => {
    setPlaylists((prev) => prev.filter((pl) => pl._id !== id));
  };

  // Update playlist (API + local)
  const updatePlaylist = async (id, data) => {
    try {
      const response = await updatePlaylistApi(id, data);
      const updated = response.data.data;
      updatePlaylistLocally(id, updated);
      toast.success("playlist updated Successfully");
      getMyPlaylistApi();
      return updated;
    } catch (err) {
      console.error("Update playlist error:", err);
      throw err;
    }
  };
  // Update locally
  const updatePlaylistLocally = (id, updatedData) => {
    setPlaylists((prev) =>
      prev.map((pl) => (pl._id === id ? { ...pl, ...updatedData } : pl))
    );

    setSinglePlaylist((prev) =>
      prev && prev._id === id ? { ...prev, ...updatedData } : prev
    );
  };

  // Delete playlist (API + local)
  const deletePlaylist = async (id) => {
    try {
      await deletePlaylistApi(id);
      deletePlaylistLocally(id);
      return true;
    } catch (err) {
      console.error("Delete playlist error:", err);
      throw err;
    }
  };

  // Add video (API + local)
  const addVideoToPlaylist = async (videoId, playlistId) => {
    try {
      const response = await addVideoToPlaylistApi(videoId, playlistId);
      addVideoToPlaylistLocally(playlistId, videoId);
      getMyPlaylistApi();
      toast.success("Video added to playlist!");
      return response.data;
    } catch (err) {
      const backendMsg = err?.response?.data?.message || "Failed to add video";
      toast.error(backendMsg);
      throw err;
    }
  };
  // Add video locally
  const addVideoToPlaylistLocally = (videoId, playlistId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl._id === playlistId ? { ...pl, videos: [...pl.videos, videoId] } : pl
      )
    );
  };

  // remove video from playlist (API + local update)
  const removeVideoFromPlaylist = async (videoId, playlistId) => {
    try {
      const confirmed = await ConfirmNotify();
      if (!confirmed) return;
      await removeVideoFromPlaylistApi(videoId, playlistId);

      removeVideoFromPlaylistLocally(videoId, playlistId);

      await getSinglePlaylist(playlistId); // refresh full playlist

      toast.success("Video removed!");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to remove video";
      toast.error(msg);
    }
  };

  // LOCAL UPDATE
  const removeVideoFromPlaylistLocally = (videoId, playlistId) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl._id === playlistId
          ? {
              ...pl,
              videos: (pl.videos || []).filter((v) => v._id !== videoId),
              totalVideos: (pl.totalVideos || 1) - 1,
            }
          : pl
      )
    );
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        currentVideo,
        singlePlaylist,
        setCurrentVideo,
       getMyPlaylist,
        loading,
        error,
        refreshPlaylists: getMyPlaylistApi,
        updatePlaylist,
        updatePlaylistLocally,
        deletePlaylist,
        deletePlaylistLocally,
        addVideoToPlaylist,
        addVideoToPlaylistLocally,
        getSinglePlaylist,
        removeVideoFromPlaylist,
        removeVideoFromPlaylistLocally,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylists = () => useContext(PlaylistContext);

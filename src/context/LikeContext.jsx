import { createContext, useContext, useEffect, useState } from "react";
import { toggleLike as toggleLikeApi } from "../services/LikeApi";
import { useAuth } from "./AuthContext";

const LikeContext = createContext();

export default function LikeProvider({ children }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState({}); // { videoId: boolean }
  const [likeCounts, setLikeCounts] = useState({}); // { videoId: number }
  const [loading, setLoading] = useState({}); // { videoId: boolean }
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    try {
      const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
      const savedCounts = JSON.parse(localStorage.getItem("likeCounts")) || {};
      setLikes(savedLikes);
      setLikeCounts(savedCounts);
    } catch (err) {
      console.error("Failed parsing localStorage for likes:", err);
    } finally {
      setInitialized(true);
    }
  }, []);
  // toggleLike: call API and update state from server when available,
  // otherwise fall back to toggling locally.
  const toggleLike = async (videoId) => {
    if (loading[videoId]) return;

    setLoading((prev) => ({ ...prev, [videoId]: true }));

    try {
      const res = await toggleLikeApi(videoId);

      const likedByUser = res.data.likedBy?._id === user?.data?._id; // true if current user liked
      const updatedCount = res.data.video?.likesCount ?? 0;

      const updatedLikes = { ...likes, [videoId]: likedByUser };
      const updatedCounts = { ...likeCounts, [videoId]: updatedCount };

      setLikes(updatedLikes);
      setLikeCounts(updatedCounts);

      localStorage.setItem("likes", JSON.stringify(updatedLikes));
      localStorage.setItem("likeCounts", JSON.stringify(updatedCounts));
    } catch (err) {
      console.error("toggleLike error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, [videoId]: false }));
    }
  };

  return (
    <LikeContext.Provider
      value={{ likes, likeCounts, loading, toggleLike, initialized }}
    >
      {children}
    </LikeContext.Provider>
  );
}

export const useLike = () => useContext(LikeContext);

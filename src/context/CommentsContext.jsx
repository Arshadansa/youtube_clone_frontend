import { createContext, useContext, useState } from "react";
import {
  addComment as addCommentApi,
  fetchComments as getCommentsApi,
} from "../services/CommentApi";
import { toast } from "react-toastify";

const CommentContext = createContext();

export default function CommentProvider({ children }) {
  const [comments, setComments] = useState({}); // comments per videoId
  const [messages, setMessages] = useState({}); // backend messages per videoId
  const [loading, setLoading] = useState({}); // loading state per videoId

  // fetch comments for a video
  const fetchComments = async (videoId) => {
    // skip fetching if already exists
    if (comments[videoId] !== undefined) return;

    setLoading((prev) => ({ ...prev, [videoId]: true }));

    try {
      const res = await getCommentsApi(videoId);
      const commentsArray = res.data?.comments || [];
      setComments((prev) => ({ ...prev, [videoId]: commentsArray }));
      setMessages((prev) => ({ ...prev, [videoId]: res.message || null }));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch comments";
      setMessages((prev) => ({ ...prev, [videoId]: msg }));
      setComments((prev) => ({ ...prev, [videoId]: [] }));
      if (err.response?.status !== 404) console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, [videoId]: false }));
    }
  };

  // add comment to a video
  const addComment = async (videoId, content) => {
    if (!content?.trim()) {
      setMessages((prev) => ({
        ...prev,
        [videoId]: "Comment cannot be empty",
      }));
      return;
    }

    if (loading[`add_${videoId}`]) return;

    setLoading((prev) => ({ ...prev, [`add_${videoId}`]: true }));

    try {
      const res = await addCommentApi(videoId, { content });
      const newComment = res.data;
      if (newComment) {
        toast.success("commented succssfully");
      }
      setComments((prev) => ({
        ...prev,
        [videoId]: prev[videoId]
          ? [newComment, ...prev[videoId]]
          : [newComment],
      }));

      setMessages((prev) => ({ ...prev, [videoId]: null }));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add comment";
      setMessages((prev) => ({ ...prev, [videoId]: msg }));
      if (err.response?.status !== 400) console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, [`add_${videoId}`]: false }));
    }
  };

  return (
    <CommentContext.Provider
      value={{ comments, messages, loading, fetchComments, addComment }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export const useComments = () => useContext(CommentContext);

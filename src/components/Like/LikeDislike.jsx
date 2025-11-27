// src/components/LikeDislike.jsx
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useLike } from "../../context/LikeContext";

export default function LikeDislike({ videoId, likesCount = 0 }) {
  const { likes, likeCounts, loading, toggleLike, initialized } = useLike();

  // always use string key
  const key = String(videoId);
  const isLiked = !!likes[key];
  const count = typeof likeCounts[key] === "number" ? likeCounts[key] : likesCount;

  // debug:
  console.debug("LikeDislike render:", { videoId: key, initialized, isLiked, count, loading: !!loading[key] });

  const handleClick = (e) => {
    // prevent accidental parent handlers from interfering
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    // pass current count as fallback for server
    toggleLike(videoId, count);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: loading[key] ? "not-allowed" : "pointer",
        opacity: loading[key] ? 0.6 : 1,
        userSelect: "none",
      }}
      role="button"
      aria-pressed={isLiked}
    >
      {isLiked ? (
        <AiFillLike size={24} color="#ffffff" />
      ) : (
        <AiOutlineLike size={24} color="#ffffff" />
      )}
      <span style={{ color: "#fff" }}>{count}</span>
    </div>
  );
}

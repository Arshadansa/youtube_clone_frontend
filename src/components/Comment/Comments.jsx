import { useAuth } from "../../context/AuthContext";
import { useComments } from "../../context/CommentsContext";
import { useEffect, useState } from "react";

export default function Comments({ videoId }) {
  const { comments, messages, fetchComments, addComment, loading } =
    useComments();

  const user = useAuth();
  const [text, setText] = useState("");
  const [inputColor, setInputColor] = useState(false);

  const videoComments = Array.isArray(comments[videoId])
    ? comments[videoId]
    : [];
  const videoMessage = messages[videoId];
  const isLoading = loading[videoId];

  // Fetch comments once
  useEffect(() => {
    if (!videoId) return;
    fetchComments(videoId);
  }, [videoId]);

  const submitHandler = () => {
    addComment(videoId, text);
    setText("");
  };
  console.log(user.user.data.avatar);

  return (
    <div className="mt-2">
      {/* Comment input */}
      <div className="flex flex-col items-end gap-2 w-full">
        <div className="flex w-full gap-2">
          <div>
            <img  alt="avatar"
                className="w-8 h-8 rounded-full" src={user.user.data.avatar}  />
          </div>
          <input
            value={text}
            onFocus={() => setInputColor(true)}
            onBlur={() => text === "" && setInputColor(false)} // close only when empty
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className={`text-white w-full border-b focus:outline-none ${
              inputColor ? "border-b-white" : "border-b-gray-400"
            } placeholder:text-gray-50`}
          />
        </div>

        {inputColor ? (
          <div className="flex mt-2 gap-2 items-center">
            <button
              type="button"
              onClick={() => {
                setInputColor(false);
                setText("");
              }}
              className="text-white px-4  cursor-pointer py-1 rounded-4xl hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submitHandler}
              disabled={loading[`add_${videoId}`]}
              className="text-white bg-gray-400 cursor-pointer hover:bg-blue-400 px-2 py-1 rounded-4xl"
            >
              {loading[`add_${videoId}`] ? "Comment..." : "Comment"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={submitHandler}
            disabled={loading[`add_${videoId}`]}
            className="text-white bg-gray-400 hover:bg-blue-400 px-2 py-1 rounded-4xl"
          >
            {loading[`add_${videoId}`] ? "Comment..." : "Comment"}
          </button>
        )}
      </div>

      {/* Comments list */}
      {isLoading ? (
        <p className="text-gray-400 mt-2">Loading comments...</p>
      ) : videoComments.length === 0 ? (
        <p className="text-gray-400 mt-2">{videoMessage}</p>
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          {videoComments.map((c) => (
            <div key={c._id} className="flex gap-2 items-start">
              <img
                src={c?.ownerDetails?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="flex  gap-2 items-center">
                  <p className="font-semibold text-md text-gray-100">
                    {c?.ownerDetails?.fullname}
                  </p>
                  <p className="text-[11px] text-gray-400 italic">
                    {new Date(c?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-gray-100">{c?.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

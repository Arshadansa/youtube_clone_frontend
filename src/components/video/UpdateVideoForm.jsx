import React from "react";
import { useVideos } from "../../context/VideoContext";
import { useForm } from "react-hook-form";

function UpdateVideoForm({ video, onClose }) {
  const { register } = useForm();

  const [name, setName] = React.useState(video?.title || "");
  const [description, setDescription] = React.useState(
    video?.description || ""
  );
  const [thumbnail, setThumbnail] = React.useState();
  const [loading, setLoading] = React.useState(false);

  console.log(name, description);

  const { editVideo, error } = useVideos();

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", description);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    await editVideo(video._id, formData);
    setLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 p-4">
      <div>
        <label className="block text-sm mb-1 text-white">Playlist Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-white">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setThumbnail(file);
            }
          }}
        />
        {thumbnail ? (
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Thumbnail Preview"
            className="w-32 h-20 object-cover rounded mt-2"
          />
        ) : video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt="Thumbnail Preview"
            className="w-32 h-20 object-cover rounded mt-2"
          />
        ) : (
          <div className="w-32 h-20 bg-gray-400 rounded flex items-center justify-center mt-2">
            <p className="text-black">No Thumbnail</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

export default UpdateVideoForm;

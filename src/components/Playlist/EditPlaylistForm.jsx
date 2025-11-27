"use client";
import { useState } from "react";
import { usePlaylists } from "../../context/PlaylistContext";

export default function EditPlaylistForm({ playlist, onClose }) {
  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");
  const [loading, setLoading] = useState(false);

  const { updatePlaylist } = usePlaylists();

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updatePlaylist(playlist._id, {
      name,
      description,
    });
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

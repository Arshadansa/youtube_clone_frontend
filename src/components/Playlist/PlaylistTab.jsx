"use client";
import { Pencil, Trash2, ListX } from "lucide-react";
import { usePlaylists } from "../../context/PlaylistContext";
import { Modal, EditPlaylistForm, TableLayout } from "../../ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function PlaylistTab({ view }) {
  const { playlists, loading, error, deletePlaylist, getMyPlaylist } =
    usePlaylists();
  const { user } = useAuth();

  const userID = user.data._id;

  useEffect(() => {
    getMyPlaylist(userID);
  }, [userID]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const openEditModal = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };

  const list = playlists?.data || playlists || [];

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    if (!confirmed) return;

    await deletePlaylist(id);
  };
  const navigate = useNavigate();

  const handlePlaylistCard = (id) => {
    navigate(`/playlist/${id}`);
  };

  if (loading) return <p>Loading playlists...</p>;

  if (view === "grid") {
    return (
      <>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit Playlist"
        >
          <EditPlaylistForm
            playlist={selectedPlaylist}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
        {error ? (
          <div className="w-full ">
            <span className="text-white">{error}</span>
          </div>
        ) : (
          <>
            {list.map((playlist) => {
              const firstVideo = playlist?.videos || [];
              const thumbnail =
                firstVideo[0]?.thumbnail ||
                firstVideo[0]?.videoFile ||
                "https://via.placeholder.com/300x180?text=No+Image";

              return (
                <div
                  key={playlist._id}
                  className="bg-white/10  border border-gray-700 p-3 rounded-xl shadow  hover:bg-white/20 transition"
                >
                  {/* Thumbnail */}
                  <img
                    onClick={() => handlePlaylistCard(playlist._id)}
                    src={thumbnail}
                    alt={playlist.name}
                    className="w-full h-40 cursor-pointer object-center rounded-lg"
                  />

                  {/* Title */}
                  <h2 className="text-xl font-semibold mt-3">
                    {playlist.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mt-2">
                    {playlist.description || "No description"}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-400 text-sm">
                      {playlist.totalVideos} videos
                    </span>

                    <div className="flex gap-2">
                      <button className="p-2 bg-white/80 rounded-full hover:bg-white transition">
                        <Pencil
                          onClick={() => openEditModal(playlist)}
                          size={16}
                          className="text-gray-700"
                        />
                      </button>

                      <button className="p-2 bg-white/80 rounded-full hover:bg-red-200 transition">
                        <Trash2
                          onClick={() => handleDelete(playlist._id)}
                          size={16}
                          className="text-red-600"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </>
    );
  }
  const columns = [
    { label: "Thumbnail" },
    { label: "Playlist", align: "center" },
    { label: "Description", align: "center" },
    { label: "Total Videos", align: "center" },
    { label: "Created", align: "center" },
    { label: "Updated", align: "center" },
    { label: "Actions", align: "center" },
  ];
  return (
    <div className="w-full">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Playlist"
      >
        <EditPlaylistForm
          playlist={selectedPlaylist}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <TableLayout columns={columns} err={error}>
        {list.map((p) => {
          const thumb =
            p.videos?.[0]?.thumbnail ||
            p.videos?.[0]?.videoFile ||
            "https://via.placeholder.com/120x70?text=No+Image";

          return (
            <tr
              key={p._id}
              className="text-center hover:bg-gray-800 transition"
            >
              <td className="py-2.5 px-4 border-b">
                <img src={thumb} className="w-28 h-16 rounded object-cover" />
              </td>

              <td className="py-2.5 px-4 border-b">{p.name}</td>

              <td className="py-2.5 px-4 border-b">{p.description || "—"}</td>

              <td className="py-2.5 px-4 border-b">{p.totalVideos}</td>

              <td className="py-2.5 px-4 border-b">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>

              <td className="py-2.5 px-4 border-b">
                {new Date(p.updatedAt).toLocaleDateString()}
              </td>

              <td className="py-2.5 px-4 border-b">
                <div className="flex justify-center gap-2">
                  <button
                    className="p-2 bg-white/20 rounded"
                    onClick={() => openEditModal(p)}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 bg-red-500/30 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </TableLayout>
    </div>
  );
}

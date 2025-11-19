"use client";
import { useVideos } from "../../context/VideoContext";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmNotify, Modal, TableLayout, UpdateVideoForm } from "../../ui";
import { useState } from "react";

export default function VideoTab() {
  const { videos, loading, error, deleteVideo, editVideo } = useVideos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openEditModal = async (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    console.log("Edit:", video);
  };

  const handleDelete = async (id) => {
    const confirmed = await ConfirmNotify();
    if (!confirmed) return;
    await deleteVideo(id);
  };

  if (loading) return <p>Loading videos...</p>;

  const columns = [
    { label: "Thumbnail" },
    { label: "Title", align: "center" },
    { label: "Comments", align: "center" },
    { label: "Likes", align: "center" },
    { label: "Views", align: "center" },
    { label: "Uploaded", align: "center" },
    { label: "Actions", align: "center" },
  ];

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Video"
      >
        <UpdateVideoForm
          video={selectedVideo}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <TableLayout
        columns={columns}
        fallback={
          <>
            <p>No videos uploaded yet.</p>
            <p>This page has yet to upload a video.</p>
          </>
        }
      >
        {videos?.map((video) => (
          <tr
            key={video._id}
            className="hover:bg-gray-800 text-center transition"
          >
            {/* Thumbnail */}
            <td className="py-2.5 px-4 border-b">
              <video
                src={video.videoFile}
                poster={video.thumbnail}
                className="w-24 h-16 rounded object-cover bg-black"
              />
            </td>

            {/* Title */}
            <td className="py-2.5 px-4 border-b capitalize">
              {video.title || "Untitled"}
            </td>

            {/* Comments */}
            <td className="py-2.5 px-4 border-b">{video.commentsCount}</td>

            {/* Likes */}
            <td className="py-2.5 px-4 border-b">{video.likesCount}</td>

            {/* Views */}
            <td className="py-2.5 px-4 border-b">{video.views}</td>

            {/* Upload Date */}
            <td className="py-2.5 px-4 border-b">
              {new Date(video.createdAt).toLocaleDateString()}
            </td>

            {/* Action Buttons */}
            <td className="py-2.5 px-4 border-b">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => openEditModal(video)}
                  className="p-2 bg-white/20 rounded hover:bg-white/30"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => handleDelete(video._id)}
                  className="p-2 bg-red-500/30 rounded hover:bg-red-500/40"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </TableLayout>
    </>
  );
}

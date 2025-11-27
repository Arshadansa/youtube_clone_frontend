"use client";
import { useVideos } from "../../context/VideoContext";
import { Pencil, Trash2 } from "lucide-react";
import {
  ConfirmNotify,
  Modal,
  TableLayout,
  UpdateVideo,
  VideoUploadForm,
} from "../../ui";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function VideoTab() {
  const { getUserVideos, setUserVideo, loading, deleteVideo, userVideo } =
    useVideos();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { user } = useAuth();

  const userID = user.data._id;

  // Open edit modal
  const openEditModal = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  // Open upload modal
  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = await ConfirmNotify();
    if (!confirmed) return;
    try {
      await deleteVideo(id);
      setUserVideo(prev => prev.filter(video => video._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserVideos(userID);
  }, [userID]);

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
      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Video"
      >
        <VideoUploadForm
          onSubmit={(formData) => {
            setIsUploadModalOpen(false);
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Video"
      >
        <UpdateVideo
          video={selectedVideo}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
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
        {userVideo?.map((video) => (
          <tr
            key={video._id}
            className="hover:bg-gray-800 text-center transition"
          >
            <td className="py-2.5 px-4 border-b">
              <video
                src={video.videoFile}
                poster={video.thumbnail}
                controls
                className="w-24 h-16 rounded object-cover bg-black"
              />
            </td>
            <td className="py-2.5 px-4 border-b capitalize">
              {video.title || "Untitled"}
            </td>
            <td className="py-2.5 px-4 border-b">{video.commentsCount || 0}</td>
            <td className="py-2.5 px-4 border-b">{video.likesCount || 0}</td>
            <td className="py-2.5 px-4 border-b">{video.views || 0}</td>
            <td className="py-2.5 px-4 border-b">
              {new Date(video.createdAt).toLocaleDateString()}
            </td>
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

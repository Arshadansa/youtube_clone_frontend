import { EllipsisVertical, ListX, Pencil } from "lucide-react";
import { Modal, ThreeDotMenu, ConfirmNotify, UpdateVideo } from "../../ui";
import { useState } from "react";
import { useVideos } from "../../context/VideoContext";

export default function VideoListSidebar({ list }) {
  const { setCurrentVideo, currentVideo, deleteVideo } = useVideos();

  const [hover, setHover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openEditModal = (list) => {
    setSelectedVideo(list);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
    const confirmed = await ConfirmNotify();
    if (!confirmed) return;

    await deleteVideo(id);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Video"
      >
        <UpdateVideo
          video={selectedVideo}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <h2 className="text-xl text-white font-semibold mb-3">{""}</h2>

      <div className="flex border  border-[#333333] shadow-md rounded-md min-h-[450px] overflow-y-scroll flex-col gap-3">
        {list?.map((video, index) => (
          <div
            key={video._id}
            className={`flex justify-between items-center p-2 rounded-lg cursor-pointer 
    ${
      currentVideo?._id === video._id ? "bg-white/20" : "hover:bg-gray-500/30"
    }`}
            onMouseEnter={() => setHover(video._id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setCurrentVideo(video)}
          >
            <div className="flex text-white gap-3">
              <img src={video.thumbnail} className="w-32 h-16 rounded" />
              <div>
                <p className="font-semibold text-sm line-clamp-2">
                  {video.title}
                </p>
                <span className="text-xs text-gray-400">Video {index + 1}</span>
              </div>
            </div>

            {hover === video._id && (
              <ThreeDotMenu
                trigger={
                  <EllipsisVertical className="cursor-pointer text-white" />
                }
              >
                <button
                  onClick={() => openEditModal(video)}
                  className=" py-2 px-4 cursor-pointer w-full hover:bg-gray-100 flex items-center gap-2"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(video._id)}
                  className=" px-4  py-2 w-full cursor-pointer hover:bg-red-100 text-red-600 flex items-center gap-2"
                >
                  <ListX size={16} /> Delete
                </button>
              </ThreeDotMenu>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

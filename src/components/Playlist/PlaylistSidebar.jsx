import { usePlaylists } from "../../context/PlaylistContext";
import { EllipsisVertical, ListX, Pencil } from "lucide-react";
import { EditPlaylistForm, Modal, ThreeDotMenu } from "../../ui";
import { useState } from "react";

export default function PlaylistSidebar() {
  const {
    singlePlaylist,
    currentVideo,
    setCurrentVideo,
    removeVideoFromPlaylist,
  } = usePlaylists();

  const [hover, setHover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const openEditModal = (singlePlaylist) => {
    setSelectedPlaylist(singlePlaylist);
    setIsModalOpen(true);
  };

  console.log(singlePlaylist,"jhjhv");
  
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
      <h2 className="text-xl font-semibold mb-3">Playlist Videos</h2>
      <div className="flex  border border-gray-200 rounded min-h-[500px] overflow-y-scroll flex-col gap-3">
        {singlePlaylist.videos?.map((video, index) => (
          <div
            key={video._id}
            className={`flex justify-between items-center gap-3 p-2 rounded-lg cursor-pointer
              ${
                currentVideo?._id === video._id
                  ? "bg-white/20"
                  : "hover:bg-gray-500/30"
              }`}
            onMouseEnter={() => setHover(video._id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setCurrentVideo(video)}
          >
            <div className="flex gap-3">
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
                trigger={<EllipsisVertical className="cursor-pointer" />}
              >
                <button onClick={() => openEditModal(singlePlaylist)} className=" py-2 px-4 cursor-pointer w-full hover:bg-gray-100 flex items-center gap-2">
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() =>
                    removeVideoFromPlaylist(video._id, singlePlaylist._id)
                  }
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

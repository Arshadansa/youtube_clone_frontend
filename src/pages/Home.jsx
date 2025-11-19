import { useState } from "react";
import { useVideos } from "../context/VideoContext";
import { usePlaylists } from "../context/PlaylistContext";
import { Ellipsis, ListPlus, Pencil, Trash2 } from "lucide-react";
import { Grid, ThreeDotMenu } from "../ui";

export default function Home() {
  const { videos, loading, error } = useVideos();
  const { playlists, addVideoToPlaylist } = usePlaylists();
console.log(error);

  // Local state
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const handleOpenPlaylistModal = (videoId) => {
    setSelectedVideoId(videoId);
    setShowPlaylistModal(true);
  };

  const handleSelectPlaylist = async (playlistId) => {
    setSelectedPlaylistId(playlistId);

    await addVideoToPlaylist(selectedVideoId, playlistId);

    setShowPlaylistModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return ( <div className="flex bg-black min-h-screen justify-center items-center"> 
    <p className="text-white text-2xl">opps..! {error}</p>
    </div>);

  return (
    <>
      <Grid>
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white border rounded-xl shadow p-3"
          >
            <video
              className="rounded-lg w-full h-40 object-cover"
              src={video.videoFile}
              poster={video.thumbnail}
              controls
            />

            <h2 className="text-lg font-semibold mt-2">{video.title}</h2>

            <div className="w-full flex justify-between mt-2">
              <div className="text-sm text-gray-600">
                Duration: {Number(video.duration).toFixed(2)} sec
              </div>

              <ThreeDotMenu trigger={<Ellipsis className="cursor-pointer" />}>
                <button
                  onClick={() => handleOpenPlaylistModal(video._id)}
                  className="px-4 py-2 w-full flex items-center gap-2 hover:bg-gray-100"
                >
                  <ListPlus size={16} /> Save to playlist
                </button>

                <button className="px-4 py-2 w-full flex items-center gap-2 hover:bg-gray-100">
                  <Pencil size={16} /> Edit Video
                </button>

                <button className="px-4 py-2 w-full flex items-center gap-2 text-red-600 hover:bg-red-100">
                  <Trash2 size={16} /> Delete Video
                </button>
              </ThreeDotMenu>
            </div>
          </div>
        ))}
      </Grid>

      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-3">Select Playlist</h3>

            {playlists.map((pl) => (
              <button
                key={pl._id}
                onClick={() => handleSelectPlaylist(pl._id)}
                className="w-full text-left p-2 mb-1 hover:bg-gray-100 rounded"
              >
                {pl.name}
              </button>
            ))}

            <button
              onClick={() => setShowPlaylistModal(false)}
              className="mt-3 w-full bg-gray-200 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

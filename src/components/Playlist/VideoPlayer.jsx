export default function VideoPlayer({ video, playlistName }) {
  if (!video) return <p>No video selected</p>;

  return (
    <div className="w-full">
      <div className="w-full border border-gray-100 aspect-video rounded-xl overflow-hidden">
        <video
          src={video.videoFile}
          controls
          className="w-full h-full object-cover object-center "
        />
      </div>

      <h1 className="text-xl font-bold mt-3">{video.title}</h1>
      <p className="text-sm text-gray-400">{playlistName}</p>
    </div>
  );
}

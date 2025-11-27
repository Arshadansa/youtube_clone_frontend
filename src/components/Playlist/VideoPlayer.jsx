import { useState } from "react";
import { ProfileHeader, LikeDislike,Comments } from "../../ui";

export default function VideoPlayer({ video, playlistName }) {
  if (!video) return <p>No video selected</p>;
  const [likesCount, setLikesCount] = useState(video.likesCount);

  return (
    <div className="w-full">
      <div className="w-full border border-gray-200/ aspect-video rounded-xl overflow-hidden">
        <video
          src={video.videoFile}
          controls
          className="w-full h-full object-cover object-center "
        />
      </div>
      <div className="flex px-3  justify-between mt-3 text-white capitalize items-center">
        <div>
          <ProfileHeader user={video} channelId={video.owner} name={video.title} playlistName={playlistName} />
        </div>
        <div>
          <h1 className="text-xl w-1/3 font-bold ">{}</h1>
          <h1 className="text-xl w-1/3 font-bold ">{}</h1>
        </div>
        {video.likesCount !== undefined && (
          <div className="text-xl font-bold ">
            {" "}
            <LikeDislike
              videoId={video._id}
              likesCount={likesCount}
              setLikesCount={setLikesCount}
            />
          </div>
        )}
      </div>
      <div className="flex  min-h-24 rounded-md bg-[#272727] text-white mt-2 px-2 p-2 gap-5 capitalize ">
        {video.description !== undefined && (
          <p className="text-md font-bold ">description: {video.description}</p>
        )}
      </div>
      <div>
        <Comments user={video} videoId={video._id}/>
      </div>
    </div>
  );
}

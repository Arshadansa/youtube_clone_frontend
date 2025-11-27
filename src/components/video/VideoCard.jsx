import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVideos } from "../../context/VideoContext";
import {
  PlaylistSidebar,
  SingleVideoLayout,
  VideoListSidebar,
  VideoPlayer,
} from "../../ui";

function VideoCard() {
  const { id } = useParams();

  const { getSingleVideo, videos, loadingVideo, currentVideo } = useVideos();

  useEffect(() => {
    getSingleVideo(id);
    
  }, [id]);

  if (loadingVideo || !getSingleVideo) return <p>loading...</p>;


  
  return (
    <div>
      <SingleVideoLayout
        left={<VideoPlayer video={currentVideo} />}
        right={<VideoListSidebar list={videos} />}
      />
    </div>
  );
}

export default VideoCard;

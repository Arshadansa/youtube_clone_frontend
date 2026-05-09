"use client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePlaylists } from "../../context/PlaylistContext";
import { SingleVideoLayout, VideoPlayer, PlaylistSidebar } from "../../ui";

export default function PlaylistCard() {
  
  
  const { id } = useParams();
  const { singlePlaylist, currentVideo, loading, getSinglePlaylist } =
    usePlaylists();

  useEffect(() => {
    getSinglePlaylist(id);
  }, [id]);

  if (loading || !singlePlaylist) return <p>Loading...</p>;

  return (
    <SingleVideoLayout
      left={
        <VideoPlayer video={currentVideo} playlistName={singlePlaylist.name} />
      }
      right={
        <PlaylistSidebar
          title="Playlist Videos"
          list={singlePlaylist}
          activeVideo={currentVideo}
        />
      }
    />
  );
}

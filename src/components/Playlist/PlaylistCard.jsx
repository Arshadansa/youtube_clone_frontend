"use client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { usePlaylists } from "../../context/PlaylistContext";
import { SingleVideoLayout } from "../../ui";
import VideoPlayer from "./VideoPlayer";
import PlaylistSidebar from "./PlaylistSidebar";

export default function PlaylistCard() {
  const { id } = useParams();
  const { singlePlaylist, currentVideo, loading, getSinglePlaylist } =
    usePlaylists();

  useEffect(() => {
    getSinglePlaylist(id);
  }, [id]);
  console.log(singlePlaylist, "current video in playlist card");

  if (loading || !singlePlaylist) return <p>Loading...</p>;

  return (
    <SingleVideoLayout
      left={
        <VideoPlayer video={currentVideo} playlistName={singlePlaylist.name} />
      }
      right={<PlaylistSidebar />}
    />
  );
}

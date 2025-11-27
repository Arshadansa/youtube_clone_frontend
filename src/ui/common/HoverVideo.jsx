"use client";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HoverVideo({ video }) {
  const navigate = useNavigate();
  const hoverTimeout = useRef(null);

  const handleMouseEnter = (e) => {
    e.target.muted = true;
    hoverTimeout.current = setTimeout(() => {
      e.target.play();
    }, 3000);
  };

  const handleMouseLeave = (e) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    e.target.pause();
    e.target.currentTime = 0;
  };

  return (
    <video
      className="rounded-lg w-full cursor-pointer h-40 object-cover"
      src={video.videoFile}
      poster={video.thumbnail}
      controls={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/watch/${video._id}`)}
    />
  );
}

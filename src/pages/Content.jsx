"use client";
import { useState } from "react";
import {
  Modal,
  VideoTab,
  PlaylistTab,
  TweetsTab,
  SubscribedTab,
  VideoUploadForm,
  PlaylistForm,
  TweetsForm,
  SubscribedForm,
} from "../ui";

import { uploadVideo } from "../services/videoApi";
import { useVideos } from "../context/VideoContext";
import { createPlaylist } from "../services/playlistApi";
import { usePlaylists } from "../context/PlaylistContext";
import { div } from "framer-motion/client";

export default function YourVideo() {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { refreshVideos } = useVideos();
  const { refreshPlaylists } = usePlaylists();

  const forms = [VideoUploadForm, PlaylistForm, TweetsForm, SubscribedForm];

  const FormComponent = forms[activeTab];

  async function handleSubmit(formData) {
    if (activeTab === 0) {
      await uploadVideo(formData);
      refreshVideos();
    }
    if (activeTab === 1) {
      await createPlaylist(formData);
      refreshPlaylists();
    }
    if (activeTab === 2) {
      // Handle tweets upload
    }
    if (activeTab === 3) {
      // Handle subscribed users upload
    }

    setIsModalOpen(false);
  }
  const [tab, setTab] = useState("Videos");
  return (
    <div className="">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-zinc-800">
        <nav className="flex items-center  justify-between mx-8 ">
          <div className="flex space-x-10 ">
          {["Videos", "Playlist", "Tweets", "Subscribed"].map(
            (label, index) => (
              <div  key={index}>
                <button
                 
                  onClick={() => {
                    setActiveTab(index);
                    setTab(label);
                  }}
                  className={`py-2 text-2xl cursor-pointer mt-5 px-1 border-b-2 ${
                    activeTab === index
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-600"
                  }`}
                >
                  {label}
                </button>
              </div>
            )
          )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className=" w-fit h-fit text-xl px-5 py-2 cursor-pointer bg-amber-300   rounded shadow hover:bg-amber-400 transition"
          >
            {tab}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-3 w-full flex justify-center">
        {activeTab === 0 && <VideoTab />}
        {activeTab === 1 && <PlaylistTab />}
        {activeTab === 2 && <TweetsTab />}
        {activeTab === 3 && <SubscribedTab />}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload"
      >
        <FormComponent onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

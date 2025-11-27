import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import VideoProvider from "./context/VideoContext.jsx";
import PlaylistProvider from "./context/PlaylistContext.jsx";
import LikeProvider from "./context/LikeContext.jsx";
import SubscriberProvider from "./context/SubscriberContext.jsx";
import CommentProvider from "./context/CommentsContext.jsx";
import SidebarProvider from "./context/SidebarContext.jsx"

createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <AuthProvider>
      <LikeProvider>
        <CommentProvider>
          <SubscriberProvider>
            <VideoProvider>
              <PlaylistProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </PlaylistProvider>
            </VideoProvider>
          </SubscriberProvider>
        </CommentProvider>
      </LikeProvider>
    </AuthProvider>
  </SidebarProvider>
);

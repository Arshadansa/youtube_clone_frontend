import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import VideoProvider from "./context/VideoContext.jsx";
import PlaylistProvider from "./context/PlaylistContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <VideoProvider>
      <PlaylistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
       </PlaylistProvider>
    </VideoProvider>
  </AuthProvider>
);

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./ui/MainLayout";
import { YourVideo, Home, Login, Signup, Playlist, PlaylistCard, VideoCard } from "./ui";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MainLayout>
      <ToastContainer position="top-right" autoClose={3000} />
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watch/:id"
            element={
              <ProtectedRoute>
                <VideoCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/your videos"
            element={
              <ProtectedRoute>
                <YourVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist"
            element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <ProtectedRoute>
                <PlaylistCard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;

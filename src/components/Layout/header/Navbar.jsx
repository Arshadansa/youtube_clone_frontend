import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ⬅ Access user + logout from AuthContext




  return (
    <header className="border-b bg-black p-2 bg-coolGray-100 text-coolGray-800 w-full">
      <div className="container flex justify-between items-center mx-auto">
       { <h1 className="text-lg text-white font-semibold">Dashboard</h1>}

        {/* Search */}
        <div className="max-w-96 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1 w-96"
          />
        </div>

        {/* Right Buttons */}
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {/* If user is logged in → Show Logout */}
          {user ? (
            <button
              onClick={logout}
              className="self-center px-8 py-3 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="self-center px-8 py-3 rounded"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>

              <button
                className="self-center px-8 py-3 font-semibold rounded bg-blue-600 text-white"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

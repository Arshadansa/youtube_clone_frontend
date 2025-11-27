import React from "react";
import { useAuth } from "../../context/AuthContext";
import { UserRound } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="w-12 h-12 flex justify-center items-center">
      {user && user?.data?.avatar ? (
        <img
          src={user.data.avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <UserRound className="w-8 h-8 text-gray-300" />
      )}
    </div>
  );
}

export default Profile;

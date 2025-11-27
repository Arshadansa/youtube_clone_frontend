import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useSidebar } from "../../../context/SidebarContext";
import { EllipsisVertical, Search } from "lucide-react";
import { AiFillYoutube } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import ThreeDotMenu from "../../../ui/common/ThreeDotMenu";
import { Profile } from "../../../ui";
import { LogOut, Settings, UserRound, UserCircle2 } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleSidebar, isCollapsed } = useSidebar();
  console.log(user);
  return (
    <header className="border-b    fixed z-20 bg-[#0f0f0f] p-2  text-coolGray-800 w-full">
      <div className="container  w-full  justify-between border-amber-50 flex  items-center ">
        <div className="flex min-w-[40%]  items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer dark:hover:bg-zinc-800 transition-colors"
          >
            <IoMdMenu size={24} className="" />
          </button>
          <AiFillYoutube size={24} className="text-red-600" />
          {<h1 className="text-lg text-white font-semibold">Youtube Clone</h1>}
        </div>

        <div className="flex min-w-[70%] justify-between items-center gap-56">
          <div className="flex bg-[#222222] items-center gap-3 w-[49%] border-t border-[0.5] border-b border-r border-gray-500 rounded-full ">
            <input
              type="text"
              placeholder="Search..."
              className="border-[0.5] border-gray-500  bg-black rounded-full  rounded-r-none focus:outline-none text-white  px-3 py-1 w-96"
            />
            <Search size={20} className="text-white hover:cursor-pointer" />
          </div>

          <div className="items-center  justify-end   flex-shrink-0 hidden lg:flex">
            {/* If user is logged in → Show Logout */}

            <ThreeDotMenu
              trigger={<Profile className="cursor-pointer text-white" />}
            >
              {user ? (
                <div className="flex bg-black flex-col gap-1 px-2 py-1 text-white">
                  {/* Profile Details */}
                  <button
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#2b2b2b]"
                  >
                    <UserCircle2 size={18} />
                    Profile Details
                  </button>

                  {/* Settings */}
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#2b2b2b]"
                  >
                    <Settings size={18} />
                    Settings
                  </button>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#2b2b2b] text-red-400"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex bg-black flex-col gap-1 px-2 py-1 text-white">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex hover:cursor-pointer items-center gap-2 px-3 py-2 rounded hover:bg-[#2b2b2b]"
                  >
                    <UserRound size={18} />
                    Sign in
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="flex hover:cursor-pointer items-center gap-2 px-3 py-2 rounded hover:bg-[#2b2b2b] text-blue-400"
                  >
                    <UserRound size={18} />
                    Sign up
                  </button>
                </div>
              )}
            </ThreeDotMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

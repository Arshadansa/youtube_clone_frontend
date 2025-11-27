import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../../context/SidebarContext";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const navItems = [
    { id: "home", name: "Home", icon: "📊", badge: null, path: "/" },
    {
      id: "subscriptions",
      name: "Subscriptions",
      icon: "📁",
      badge: "3",
      path: "/subscriptions",
    },
    {
      id: "histroy",
      name: "Histroy",
      icon: "✅",
      badge: "12",
      path: "/histroy",
    },
    {
      id: "playlist",
      name: "Playlist",
      icon: "👥",
      badge: null,
      path: "/playlist",
    },
    {
      id: "your-videos",
      name: "Content",
      icon: "📈",
      badge: "New",
      path: "/your videos",
      target: "_blank",
    },
    {
      id: "liked-videos",
      name: "liked videos",
      icon: "⚙️",
      badge: null,
      path: "/liked videos",
    },
    {
      id: "support",
      name: "support",
      icon: "⚙️",
      badge: null,
      path: "/support",
    },
    {
      id: "settings",
      name: "Settings",
      icon: "⚙️",
      badge: null,
      path: "/settings",
    },
  ];
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`${
        isCollapsed ? "w-12   " : "  bg-black/50     "
      }  z-10  h-screen bg-[#0f0f0f] fixed    shrink-0`}
    >
      <div className="   w-fit">
        <nav className="space-y-2  w-fit">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              target={item.target}
              onClick={() => setActiveItem(item.id)}
              className={`w-full  flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                activeItem === item.id
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        item.badge === "New"
                          ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                          : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {!isCollapsed && (
          <div className=" pt-6 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 px-3 py-2">
              <img
                src="https://picsum.photos/200?random=40"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

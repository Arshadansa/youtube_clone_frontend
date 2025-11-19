import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 bg-gray-50 dark:bg-zinc-900  p-4 shrink-0`}
    >
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && (
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            YouTube Clone
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
        >
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <nav className="space-y-2">
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
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
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
    </aside>
  );
}

import { useSidebar } from "../context/SidebarContext";
import { Footer, Navbar, Sidebar } from "../ui/index";

export default function MainLayout({ children }) {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="bg-[#181818]   min-h-screen">
      <Navbar />
      <div className="flex pt-[64px] ">
        <Sidebar />
        <main
          className={`flex-1 p-2   ${
            isCollapsed
              ? "pl-14 pr-4 transition-all duration-100 ease-in-out "
              : "ml-[203px] transition-all duration-100 ease-in-out"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

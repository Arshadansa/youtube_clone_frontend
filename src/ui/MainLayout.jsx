
import { Footer, Navbar, Sidebar } from "../ui/index";


export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1  overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}

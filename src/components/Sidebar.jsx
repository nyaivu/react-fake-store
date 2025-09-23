import { Link } from "react-router";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md`}
    >
      <div className="p-4 font-bold text-xl">My Admin</div>
      <nav className="flex flex-col p-4 space-y-2">
        {/* Navigasi Link ke halaman dashboard */}
        <Link
          to="/admin"
          className="hover:bg-gray-200 p-2
rounded"
        >
          Dashboard
        </Link>
        <Link to="/admin/about" className="hover:bg-gray-200 p-2 rounded">
          About
        </Link>
      </nav>
    </div>
  );
}

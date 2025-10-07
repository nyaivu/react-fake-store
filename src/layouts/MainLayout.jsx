import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      <header className="bg-gray-100 p-4 flex flex-col md:flex-row gap-2 justify-between items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search products..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        />
        <select name="category" id="category">
          <option value="semua">All Categories</option>
          <option value="elektronik">Electronic</option>
          <option value="fashion">Fashion</option>
          <option value="kecantikan">Beauty</option>
        </select>
      </header>

      <main className=" flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

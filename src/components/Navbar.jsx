import { useState } from "react";
import { Link } from "react-router";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { isNavOpen, setIsNavOpen } = useState(false);
  const count = useCartStore((state) => state.count);

  return (
    <nav className="sticky top-0 inset-x-0 bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl">
        MyShop {isNavOpen}
      </Link>

      {/* <button className="p-2 text-lg" onClick={() => setIsNavOpen(!isNavOpen)}>
        ☰
      </button> */}

      {/* Menu Navigasi */}
      <div
        className={"right-0 top-15 bg-blue-600 flex flex-row gap-6"}
        // hidden={!setIsNavOpen}
      >
        {/* Dashboard Links */}
        <Link to="/" className="hover:text-gray-200">
          Dashboard
        </Link>
        <Link to="/cart" className="flex flex-row gap-1 hover:text-gray-200">
          Cart
          {/* Menampilkan count jika ada item di keranjang */}
          {count > 0 && (
            <span className=" bg-red-500 text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </Link>
        <Link to="/checkout" className="hover:text-gray-200">
          Checkout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

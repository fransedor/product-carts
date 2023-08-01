"use client";

import { ROUTE_LIST } from "@/app/utils/constants/route";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

interface NavbarButtonsProps {
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavbarButtons: React.FC<NavbarButtonsProps> = ({ setOpenNavbar }) => {
  return (
    <div className=" w-full h-14 lg:h-screen flex justify-center relative lg:w-max border border-red-300 p-4">
      <p className="lg:hidden ">Product Cart</p>
      <button
        className="absolute left-6 top-1/2 h-max -translate-y-1/2 p-2 border lg:static lg:translate-y-0 border-black rounded-lg hover:bg-green-300 hover:shadow-md"
        onClick={() => setOpenNavbar((prevState) => !prevState)}
      >
        <FaBars size={24} className="m-0" />
      </button>
    </div>
  );
};

const Navbar = () => {
	const pathname = usePathname();
	console.log(pathname)
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <>
      <NavbarButtons setOpenNavbar={setOpenNavbar} />
      {openNavbar && (
        // Navbar expanded background
        <div
          className="fixed w-screen h-screen top-0 bg-black bg-opacity-20"
          onClick={() => setOpenNavbar(false)}
        >
          {/* Navbar expanded container */}
          <div className="bg-white w-3/4 lg:w-1/4 h-screen p-8 flex flex-col gap-8">
            {ROUTE_LIST.map((route) => (
              <Link href={route.url} key={route.id}>
                <p className={`${pathname.includes(route.url) ? "text-green-400" : "text-black"}`}>{route.label}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

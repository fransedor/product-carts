'use client'

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

interface NavbarButtonsProps {
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavbarButtons: React.FC<NavbarButtonsProps> = ({ setOpenNavbar }) => {
  return (
    <div className=" w-full h-14 lg:h-screen flex justify-center relative lg:w-max border border-red-300 p-4">
      <p className="lg:hidden ">Product Cart</p>
      <div className="absolute left-6 top-1/2 h-max -translate-y-1/2 p-2 border lg:static lg:translate-y-0 border-black rounded-lg">
        <FaBars size={24} className="m-0"/>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <>
      <NavbarButtons setOpenNavbar={setOpenNavbar}/>
      {/*<div className="lg:w-1/4 lg:fixed flex py-4 px-6 justify-center relative border border-red-300">
        <p>Product Cart</p>
        <div className="block lg:hidden absolute right-6 top-1/2 -translate-y-1/2">
          <FaBars size={32} />
        </div>
      </div>*/}
    </>
  );
};

export default Navbar;

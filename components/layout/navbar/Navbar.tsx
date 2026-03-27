"use client";

import { useState } from "react";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <Logo />
        <DesktopMenu />
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default Navbar;

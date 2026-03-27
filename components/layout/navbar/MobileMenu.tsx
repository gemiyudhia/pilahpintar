import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "./nav-data";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-700 hover:text-green-600 focus:outline-none"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-5 px-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-green-600 font-medium py-2 block border-b border-gray-50 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <Link href="#contact" onClick={() => setIsOpen(false)}>
            <button className="w-full mt-2 px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
              Hubungi Kami
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

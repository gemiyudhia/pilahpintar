import Link from "next/link";
import { NAV_LINKS } from "./nav-data"; // Import datanya
import { Button } from "@/components/ui/button";

export default function DesktopMenu() {
  return (
    <div className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-gray-600 hover:text-green-600 font-medium transition-colors"
        >
          {link.name}
        </Link>
      ))}
      <Link href="#contact">
        <Button className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all cursor-pointer">
          Hubungi Kami
        </Button>
      </Link>
    </div>
  );
}

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 container mx-auto px-5 fixed top-0 left-0 right-0 bg-white z-50">
      <Link href="/" className="flex items-center gap-x-2">
        <Image src="/favicon.ico" alt="Logo Aplikasi" width={50} height={50} />
        <h1 className="font-bold text-xl text-green-700">PilahPintar</h1>
      </Link>

      <div>
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;

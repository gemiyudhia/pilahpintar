import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-5 mb-7">
      <Link href="/" className="flex items-center gap-x-2">
        <Image src="/favicon.ico" alt="Logo Aplikasi" width={50} height={50} />
        <h1 className="font-bold text-xl text-green-700">PilihSampah</h1>
      </Link>

      <div>
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;

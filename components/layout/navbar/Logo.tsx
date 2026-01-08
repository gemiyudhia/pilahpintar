import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-x-2 z-50">
      <Image src="/favicon.ico" alt="Logo Aplikasi" width={40} height={40} />
      <h1 className="font-bold text-xl text-green-700">PilahPintar</h1>
    </Link>
  );
}

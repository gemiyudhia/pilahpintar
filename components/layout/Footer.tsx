import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          <div className="col-span-2 md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Image
                src="/favicon.ico"
                alt="logo aplikasi"
                width={50}
                height={50}
              />
              <h2 className="text-2xl font-bold">
                Pilah<span className="text-green-500">Pintar</span>
              </h2>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              Sistem deteksi sampah berbasis machine learning untuk membantu
              Anda memilah sampah anorganik secara cerdas.
            </p>
          </div>

          <div className="col-span-1 md:col-span-3 md:col-start-7">
            <h3 className="text-white font-bold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              {["Beranda", "Tentang Kami", "Cara Kerja", "Hubungi Kami"].map(
                (item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-green-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 text-right">
            <h3 className="text-white font-bold text-lg mb-4">Ikuti Kami</h3>

            <div className="flex gap-3 justify-end">
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">PilahPintar</span>. All
            rights reserved. Dibuat oleh Gemi Yudhia.
          </p>
        </div>
      </div>
    </footer>
  );
}

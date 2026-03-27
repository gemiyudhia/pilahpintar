import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "./navbar/nav-data";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
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
              {NAV_LINKS.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`${item.href.replace(" ", "-")}`}
                    className="hover:text-green-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 md:col-span-3 text-right">
            <h3 className="text-white font-bold text-lg mb-4">Referensi</h3>

            <Link href="https://www.acuanbersama.com/2021/08/permenlhk-nomor-14-tahun-2021-tentang.html">
              Standar LHK
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">
              Gemi Yudhia - Teknologi Informasi Universitas Teuku Umar.
            </span>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* BAGIAN ATAS: Grid Layout (Logo di Kiri, Link di Kanan) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* KOLOM 1: Brand & Deskripsi (Lebar 5 kolom di Desktop) */}
          <div className="md:col-span-5 space-y-4">
            {/* Logo */}
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

            {/* Deskripsi */}
            <p className="text-slate-400 leading-relaxed text-sm">
              Sistem deteksi sampah berbasis machine learning untuk membantu
              Anda memilah sampah anorganik secara cerdas. Bersama wujudkan
              lingkungan Indonesia yang bebas sampah dan bernilai ekonomi.
            </p>
          </div>

          {/* KOLOM 2: Navigasi (Lebar 3 kolom) */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-white font-bold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-green-400 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-green-400 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="hover:text-green-400 transition-colors"
                >
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-green-400 transition-colors"
                >
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: Sosial Media / Lainnya (Lebar 3 kolom) */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-lg mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* BAGIAN BAWAH: Copyright */}
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

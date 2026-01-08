import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="beranda" className="py-20 pt-32 lg:pt-48">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Deteksi Sampah Cerdas dalam{" "}
            <span className="text-green-600">Satu Klik</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Didukung oleh teknologi Deep Learning YOLOv8. Identifikasi jenis
            sampah Plastik, Kertas, Logam, dan Kaca secara instan dan akurat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="#" className="w-full sm:w-auto">
              <Button className="w-full px-8 py-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg text-lg">
                Mulai Deteksi
              </Button>
            </Link>
            <Link href="#" className="w-full sm:w-auto">
              <Button className="w-full px-8 py-6 border-gray-200 border-2 hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm text-lg bg-white">
                Cara Kerja
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 hidden lg:flex justify-center relative">
          <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50"></div>

          <Image
            src="/hero-image.png"
            alt="Ilustrasi deteksi sampah"
            width={1000}
            height={1000}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}

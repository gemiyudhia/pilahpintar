import ContactForm from "@/components/features/ContactForm";
import WasteCard from "@/components/features/WastedCard";
import { Button } from "@/components/ui/button";
import { WasteCategory } from "@/types";
import { Camera, Leaf, ScanLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories: WasteCategory[] = [
  {
    title: "Sampah Plastik",
    description:
      "Botol minum kemasan, gelas plastik, dan wadah deterjen. Bernilai ekonomi tinggi jika bersih.",
    imageSrc: "/plastic.JPG",
    categoryType: "plastic",
  },
  {
    title: "Sampah Kertas",
    description:
      "Kardus bekas, koran, dan kertas arsip. Pastikan kering dan tidak berminyak.",
    imageSrc: "/paper.png",
    categoryType: "paper",
  },
  {
    title: "Sampah Logam",
    description:
      "Kaleng minuman soda, kaleng susu, dan makanan awetan. Pisahkan dari residu.",
    imageSrc: "/metal.jfif",
    categoryType: "metal",
  },
  {
    title: "Sampah Kaca",
    description:
      "Botol sirup, kecap, dan toples selai. Jangan dipecahkan agar aman.",
    imageSrc: "/glass.jpg",
    categoryType: "glass",
  },
];

const steps = [
  {
    icon: <Camera className="w-6 h-6 text-green-600" />,
    title: "1. Foto Sampahmu",
    description:
      "Ambil foto sampah anorganik (botol, kaleng, kardus, kaca) dengan pencahayaan yang cukup.",
  },
  {
    icon: <ScanLine className="w-6 h-6 text-green-600" />,
    title: "2. AI Menganalisa",
    description:
      "Sistem cerdas kami akan mendeteksi objek dan menentukan kategorinya secara instan.",
  },
  {
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    title: "3. Dapatkan Solusi",
    description:
      "Terima panduan daur ulang yang tepat agar sampahmu bernilai ekonomi tinggi.",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto">
      {/* hero section */}
      <section className="py-20 pt-40">
        {/* Tagline Hero */}
        <div className="container mx-auto px-4 flex items-center gap-12">
          <div className="">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              Deteksi Sampah Cerdas dalam Satu Klik
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
              Didukung oleh teknologi Deep Learning YOLOv8. Identifikasi jenis
              sampah Plastik, Kertas, Logam, dan Kaca secara instan dan akurat
              untuk lingkungan yang lebih baik.
            </p>
            {/* call to action */}
            <div className="flex flex-col gap-4 justify-center">
              <Link href="#">
                <Button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full">
                  Mulai Deteksi
                </Button>
              </Link>
              <Link href="#">
                <Button className="px-8 py-4 border-gray-800 border-2 hover:bg-white hover:text-gray-900 bg-white text-gray-700 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full">
                  Cara Kerja
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden">
            <div>
              <Image
                src="/hero-image.png"
                alt="hero image"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* about section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          {/* JUDUL / HEADING */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            Mengenal <span className="text-green-600">PilahPintar</span>
          </h2>

          <div className="w-20 h-1 bg-green-500 mx-auto mb-8 rounded-full"></div>

          {/* ISI TEKS / PARAGRAF */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto text-left">
            Indonesia menghasilkan jutaan ton sampah setiap tahunnya, namun
            tingkat daur ulang masih rendah karena sulitnya proses pemilahan.
            <span className="font-semibold text-gray-800"> PilahPintar </span>
            hadir sebagai solusi cerdas untuk mengatasi masalah ini.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mt-4 text-left">
            Menggabungkan teknologi <em>Artificial Intelligence</em> (YOLOv8)
            terkini, aplikasi ini membantu Anda mengenali jenis sampah anorganik
            seperti Plastik, Kertas, Logam, dan Kaca hanya dalam hitungan detik.
            Misi kami sederhana, mengubah sampah menjadi barang bernilai ekonomi
            sesuai standar Bank Sampah.
          </p>

          <Image
            className="hidden"
            src="/about-image.png"
            alt=""
            width={500}
            height={500}
          />
        </div>
      </section>

      {/* waste section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Kenali Jenis Sampahmu
            </h2>
            <p className="text-gray-600 mt-2">
              Sistem kami dapat mendeteksi 4 kategori utama ini
            </p>
          </div>
          <div className="grid grid-cols-1"></div>
          {categories.map((item, index) => (
            <WasteCard
              key={index}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              categoryType={item.categoryType}
            />
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Container Abu-abu (Sesuai sketsa kotak di gambar) */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Cara Menggunakan{" "}
                <span className="text-green-600">PilahPintar</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Hanya butuh beberapa saat untuk mendapatkan rekomendasi daur
                ulang
              </p>
            </div>

            {/* List Langkah-langkah */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 md:gap-6 group"
                >
                  {/* Bagian Ikon Bulat (Kiri) */}
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-green-100 flex items-center justify-center shadow-sm group-hover:border-green-500 transition-colors">
                    {step.icon}
                  </div>

                  {/* Bagian Teks (Kanan) */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol CTA di Bawah (Opsional, pemanis) */}
            <div className="mt-10 text-center">
              <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30">
                Coba Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <ContactForm />
      </section>
    </div>
  );
}

import { WasteCategory } from "@/types";
import { Camera, Leaf, ScanLine } from "lucide-react";

export const WASTE_CATEGORIES: WasteCategory[] = [
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

export const HOW_IT_WORKS_STEPS = [
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

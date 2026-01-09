// lib/dummy-data.ts

export interface DetectionResult {
  id: string;
  imageUrl: string;
  label: string;
  confidence: string;
  category: string;
  description: string;
  recommendations: string[];
}

export const DUMMY_DATA: Record<string, DetectionResult> = {
  "123": {
    id: "123",
    imageUrl:
      "https://images.unsplash.com/photo-1596131398982-89647265a6f2?q=80&w=600&auto=format&fit=crop",
    label: "Botol Plastik (PET)",
    confidence: "94%",
    category: "Anorganik",
    description:
      "Botol plastik jenis PET transparan. Sampah ini memiliki nilai jual tinggi di bank sampah jika kondisinya bersih.",
    recommendations: [
      "Tuang habis cairan di dalamnya",
      "Lepaskan label merek jika ada",
      "Remukkan botol (gepengkan)",
      "Pisahkan tutup botolnya",
    ],
  },
};

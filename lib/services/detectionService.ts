import { supabase } from "@/lib/supabase";
import { Label, Recommendation } from "@/types";
import { mapLabelToKategori } from "../utils";

export async function getRecommendationByLabel(
  label: Label | string,
): Promise<Recommendation> {
  const { data, error } = await supabase
    .from("kategori")
    .select(
      `
      id_kategori,
      label_kelas,
      rekomendasi (
        isi_konten
      )
    `,
    )
    .eq("label_kelas", label)
    .single();

  if (error || !data) {
    console.error("❌ Supabase error:", error);
    return { description: "Rekomendasi tidak ditemukan", steps: [] };
  }

  const isiKonten =
    (data.rekomendasi as { isi_konten: string }[])?.[0]?.isi_konten ?? "";

  return { description: isiKonten, steps: [isiKonten] };
}

export async function logDetectionHistory(params: {
  imageUrl: string;
  confidence: number;
  label: string;
}): Promise<void> {
  const { error } = await supabase.from("log_riwayat").insert([
    {
      lokasi_gambar: params.imageUrl,
      skor_akurasi: params.confidence,
      label_deteksi: params.label,
      id_kategori: mapLabelToKategori(params.label),
    },
  ]);

  if (error) {
    console.error("❌ Failed to log detection history:", error);
  }
}

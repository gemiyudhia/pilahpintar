import { supabase } from "@/lib/supabase";
import { mapLabelToKategori } from "../utils";

export async function getResultByLabel(label: string) {
  const { data, error } = await supabase
    .from("kategori")
    .select(
      `
      id_kategori,
      label_kelas,
      nilai_jual,
      rekomendasi (
        isi_konten
      )
    `,
    )
    .eq("label_kelas", label)
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return {
    label: data.label_kelas,
    nilai_jual: data.nilai_jual,
    description: data.rekomendasi?.[0]?.isi_konten ?? "",
  };
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

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

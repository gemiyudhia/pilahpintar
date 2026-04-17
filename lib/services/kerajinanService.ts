import { supabase } from "@/lib/supabase";

export type Kerajinan = {
  id_kerajinan: number;
  nama_kerajinan: string;
  deskripsi: string | null;
  gambar_url: string | string[] | null;
  id_kategori: number;
};

export async function getKerajinanByKategori(
  idKategori: number,
): Promise<Kerajinan[]> {
  const { data, error } = await supabase
    .from("kerajinan")
    .select("*")
    .eq("id_kategori", idKategori);

  if (error) {
    console.error("❌ Gagal fetch kerajinan:", error);
    return [];
  }

  return data ?? [];
}

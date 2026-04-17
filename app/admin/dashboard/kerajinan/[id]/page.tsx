import EditKerajinanClient from "@/components/EditKerajinanClient";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId)) {
    return <div className="p-10 text-center">ID tidak valid</div>;
  }

  const [kat, ker] = await Promise.all([
    supabase.from("kategori").select("id_kategori,nama_alias"),
    supabase
      .from("kerajinan")
      .select("*")
      .eq("id_kerajinan", parsedId)
      .single(),
  ]);

  if (!ker.data) {
    return <div className="p-10 text-center">Data tidak ditemukan</div>;
  }

  return (
    <EditKerajinanClient
      id={parsedId}
      kategori={kat.data || []}
      data={ker.data}
    />
  );
}

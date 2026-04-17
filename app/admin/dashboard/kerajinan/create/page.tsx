import CreateKerajinanForm from "@/components/form/CreateKerajinanForm";
import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data: kategoriList } = await supabase
    .from("kategori")
    .select("id_kategori, nama_alias")
    .order("nama_alias");

  return <CreateKerajinanForm kategoriList={kategoriList || []} />;
}

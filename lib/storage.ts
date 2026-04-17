import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const BUCKET = "kerajinan-images";

export async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: fd,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error);

  return json.url;
}

export async function deleteFile(url: string) {
  const name = url.split("/").pop();
  if (!name) return;

  await supabase.storage.from(BUCKET).remove([name]);
}

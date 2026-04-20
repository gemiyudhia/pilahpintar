"use server";

import { prisma } from "@/lib/prisma";
import { BUCKET_NAME, supabaseAdmin } from "@/lib/supabase-admin";
import { mapLabelToKategori } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createKategori(formData: FormData) {
  console.log("=== createKategori dipanggil ===");
  console.log("label:", formData.get("label_kelas"));
  console.log("nama:", formData.get("nama_alias"));
  const label = formData.get("label_kelas") as string;
  const nama = formData.get("nama_alias") as string;
  const material = formData.get("jenis_material") as string;
  const harga = formData.get("nilai_jual") as string;
  const kontenLHK = formData.get("isi_konten") as string;

  try {
    await prisma.kategori.create({
      data: {
        label_kelas: label,
        nama_alias: nama,
        jenis_material: material,
        nilai_jual: parseFloat(harga),
        rekomendasi: {
          create: {
            isi_konten: kontenLHK,
          },
        },
      },
    });
  } catch (error) {
    console.error("Gagal create kategori:", error);
    throw error;
  }

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard/recommendations");
}

export async function updateKategori(formData: FormData) {
  const id = parseInt(formData.get("id_kategori") as string);
  const nama = formData.get("nama_alias") as string;
  const material = formData.get("jenis_material") as string;
  const harga = formData.get("nilai_jual") as string;
  const kontenLHK = formData.get("konten") as string;

  await prisma.kategori.update({
    where: { id_kategori: id },
    data: {
      nama_alias: nama,
      jenis_material: material,
      nilai_jual: parseFloat(harga),
      rekomendasi: {
        upsert: {
          create: { isi_konten: kontenLHK },
          update: { isi_konten: kontenLHK },
        },
      },
    },
  });

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deleteKategori(id: number) {
  await prisma.kategori.delete({
    where: { id_kategori: id },
  });

  revalidatePath("/admin/dashboard");
}

export async function uploadGambar(formData: FormData): Promise<string | null> {
  const file = formData.get("file") as File;
  if (!file) return null;

  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(fileName, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return null;

  const { data } = supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);
  return data.publicUrl;
}

export async function createKerajinan(
  urls: string[],
  form: {
    nama_kerajinan: string;
    id_kategori: string;
    deskripsi: string;
  },
) {
  await prisma.kerajinan.create({
    data: {
      nama_kerajinan: form.nama_kerajinan,
      id_kategori: parseInt(form.id_kategori),
      deskripsi: form.deskripsi,
      gambar_url: urls,
    },
  });

  revalidatePath("/admin/dashboard/recommendations");
}

export async function deleteKerajinan(id: number) {
  await prisma.kerajinan.delete({
    where: { id_kerajinan: id },
  });

  revalidatePath("/admin/dashboard/recommendations");
}

export async function logDetectionHistory(params: {
  imageUrl: string;
  confidence: number;
  label: string;
}): Promise<void> {
  // Upload gambar ke Supabase
  let permanentUrl = params.imageUrl;

  try {
    const response = await fetch(params.imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "image/webp";
    const ext = contentType.split("/")[1] ?? "webp";
    const fileName = `deteksi/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("kerajinan-images")
      .upload(fileName, buffer, {
        contentType,
        cacheControl: "3600",
        upsert: false,
      });

    if (!uploadError) {
      const { data } = supabaseAdmin.storage
        .from("kerajinan-images")
        .getPublicUrl(fileName);
      permanentUrl = data.publicUrl;
    }
  } catch (e) {
    console.error("Gagal upload gambar:", e);
  }

  // Simpan ke database via Prisma
  await prisma.logRiwayat.create({
    data: {
      lokasi_gambar: permanentUrl,
      skor_akurasi: params.confidence,
      label_deteksi: params.label,
      id_kategori: mapLabelToKategori(params.label),
    },
  });
}

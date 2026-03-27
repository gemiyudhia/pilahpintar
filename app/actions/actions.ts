"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createKategori(formData: FormData) {
  const label = formData.get("label_kelas") as string;
  const nama = formData.get("nama_alias") as string;
  const material = formData.get("jenis_material") as string;
  const harga = formData.get("nilai_jual") as string;
  const kontenLHK = formData.get("isi_konten") as string;

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

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
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

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, form, urls } = body;

    if (!id || !form) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    const updated = await prisma.kerajinan.update({
      where: { id_kerajinan: Number(id) },
      data: {
        nama_kerajinan: form.nama_kerajinan,
        id_kategori: Number(form.id_kategori),
        deskripsi: form.deskripsi,
        gambar_url: urls ?? [],
      },
    });

    return NextResponse.json(
      { message: "Berhasil diperbarui", data: updated },
      { status: 200 },
    );
  } catch (error) {
    console.error("Gagal update kerajinan:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui kerajinan" },
      { status: 500 },
    );
  }
}

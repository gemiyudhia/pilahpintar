import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params; // ← await params dulu
  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
  }

  try {
    await prisma.kategori.delete({
      where: { id_kategori: numericId },
    });

    return NextResponse.json(
      { message: "Kategori berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Gagal menghapus kategori:", error);
    return NextResponse.json(
      { message: "Gagal menghapus kategori" },
      { status: 500 },
    );
  }
}

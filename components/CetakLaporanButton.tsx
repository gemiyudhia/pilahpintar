"use client";

import { ReactElement, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

type LogItem = {
  id_riwayat: number;
  lokasi_gambar: string;
  skor_akurasi: number;
  waktu_deteksi: Date | string;
  kategori: {
    nama_alias: string;
    label_kelas: string;
    jenis_material: string;
  } | null;
};

export function CetakLaporanButton({
  logs,
  children,
}: {
  logs: LogItem[];
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const handleCetak = async () => {
    setLoading(true);

    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF({ orientation: "landscape" });
    const now = new Date().toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Laporan Riwayat Deteksi Sampah", 14, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(`Dicetak pada: ${now}`, 14, 26);
    doc.text(`Total data: ${logs.length}`, 14, 32);
    doc.setTextColor(0);

    // Tabel
    autoTable(doc, {
      startY: 38,
      head: [
        [
          "No",
          "ID",
          "Hasil Deteksi",
          "Label",
          "Jenis Material",
          "Akurasi",
          "Status",
          "Waktu",
        ],
      ],
      body: logs.map((item, index) => {
        const percentage = Math.round(item.skor_akurasi * 100);
        const isSuccess = percentage >= 50;
        const formattedDate = new Date(item.waktu_deteksi).toLocaleString(
          "id-ID",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
        );

        return [
          index + 1,
          `#${item.id_riwayat}`,
          item.kategori?.nama_alias ?? "-",
          item.kategori?.label_kelas ?? "-",
          item.kategori?.jenis_material ?? "-",
          `${percentage}%`,
          isSuccess ? "OK" : "Low",
          `${formattedDate} WIB`,
        ];
      }),
      headStyles: {
        fillColor: [22, 163, 74], // green-600
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9,
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [240, 253, 244] }, // green-50
      columnStyles: {
        0: { halign: "center", cellWidth: 10 },
        1: { halign: "center", cellWidth: 15 },
        5: { halign: "center", cellWidth: 18 },
        6: { halign: "center", cellWidth: 15 },
      },
      didDrawCell: (data) => {
        // Warna teks akurasi
        if (data.section === "body" && data.column.index === 5) {
          const val = parseInt(data.cell.text[0]);
          doc.setTextColor(
            val > 80 ? 22 : 202,
            val > 80 ? 163 : 138,
            val > 80 ? 74 : 2,
          );
        }
        // Warna status
        if (data.section === "body" && data.column.index === 6) {
          const isOk = data.cell.text[0] === "OK";
          doc.setTextColor(isOk ? 22 : 220, isOk ? 163 : 38, isOk ? 74 : 38);
        }
      },
    });

    // Footer tiap halaman
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Halaman ${i} dari ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 8,
        { align: "center" },
      );
    }

    doc.save(`laporan-deteksi-${Date.now()}.pdf`);
    setLoading(false);
  };

  return (
    <Button variant="outline" onClick={handleCetak} disabled={loading}>
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {loading ? "Membuat PDF..." : children}
    </Button>
  );
}

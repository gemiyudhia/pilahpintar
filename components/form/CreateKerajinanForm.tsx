"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGambarUpload } from "@/hooks/useGambarUpload";
import { Kategori, KerajinanForm } from "@/types/types";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "../PageHeader";
import { ErrorAlert, SuccessAlert } from "../Alert";
import { InfoDasarSection } from "../InfoDasarSection";
import { UploadGambarSection } from "../UploadGambarSection";
import { FormActions } from "../FormAction";
import { createKerajinan, uploadGambar } from "@/app/actions/actions";

const BACK_HREF = "/admin/dashboard/recommendations";

export default function CreateKerajinanForm({
  kategoriList,
}: {
  kategoriList: Kategori[];
}) {
  const router = useRouter();
  const {
    fileInputRef,
    gambarItems,
    handleFileChange,
    removeGambar,
    uploadAll,
    anyUploading,
  } = useGambarUpload();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<KerajinanForm>({
    nama_kerajinan: "",
    id_kategori: "",
    deskripsi: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Upload semua gambar via server action
    const uploadedUrls: string[] = [];
    for (const item of gambarItems) {
      const fd = new FormData();
      fd.append("file", item.file);
      const url = await uploadGambar(fd);
      if (url) uploadedUrls.push(url);
    }

    await createKerajinan(uploadedUrls, form);

    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push(BACK_HREF), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        backHref={BACK_HREF}
        breadcrumb="Panel Admin · Manajemen Rekomendasi"
        title="Tambah Kerajinan Baru"
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {success && (
          <SuccessAlert message="Berhasil disimpan! Mengalihkan..." />
        )}
        {error && <ErrorAlert message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InfoDasarSection
            form={form}
            kategoriList={kategoriList}
            onChange={(updated) => setForm((prev) => ({ ...prev, ...updated }))}
          />

          <UploadGambarSection
            fileInputRef={fileInputRef}
            gambarItems={gambarItems}
            onFileChange={handleFileChange}
            onRemove={removeGambar}
          />

          <FormActions
            cancelHref={BACK_HREF}
            loading={loading}
            disabled={loading || anyUploading}
          />
        </form>
      </div>
    </div>
  );
}

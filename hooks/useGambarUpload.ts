import { useRef, useState } from "react";
import { supabase, BUCKET_NAME } from "../lib/supabase";
import { NewGambarPayload } from "@/types/types";

export function useGambarUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [gambarItems, setGambarItems] = useState<NewGambarPayload[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems: NewGambarPayload[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
      uploaded: false,
      url: null,
      error: null,
    }));

    setGambarItems((prev) => [...prev, ...newItems]);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadSingleFile = async (
    item: NewGambarPayload,
    index: number,
  ): Promise<string | null> => {
    setGambarItems((prev) =>
      prev.map((g, i) =>
        i === index ? { ...g, uploading: true, error: null } : g,
      ),
    );

    const ext = item.file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, item.file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setGambarItems((prev) =>
        prev.map((g, i) =>
          i === index
            ? {
                ...g,
                uploading: false,
                error: "Gagal upload: " + uploadError.message,
              }
            : g,
        ),
      );
      return null;
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    setGambarItems((prev) =>
      prev.map((g, i) =>
        i === index
          ? { ...g, uploading: false, uploaded: true, url: publicUrl }
          : g,
      ),
    );

    return publicUrl;
  };

  const uploadAll = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (let i = 0; i < gambarItems.length; i++) {
      const item = gambarItems[i];
      if (item.uploaded && item.url) {
        uploadedUrls.push(item.url);
      } else {
        const url = await uploadSingleFile(item, i);
        if (url) uploadedUrls.push(url);
      }
    }

    return uploadedUrls;
  };

  const removeGambar = async (index: number) => {
    const item = gambarItems[index];

    if (item.url) {
      const fileName = item.url.split("/").pop();
      if (fileName) {
        await supabase.storage.from(BUCKET_NAME).remove([fileName]);
      }
    }

    URL.revokeObjectURL(item.preview);
    setGambarItems((prev) => prev.filter((_, i) => i !== index));
  };

  const anyUploading = gambarItems.some((g) => g.uploading);

  return {
    fileInputRef,
    gambarItems,
    handleFileChange,
    removeGambar,
    uploadAll,
    anyUploading,
  };
}

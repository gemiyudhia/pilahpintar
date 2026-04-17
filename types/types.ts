export type Kategori = {
  id_kategori: number;
  nama_alias: string;
};

export type KerajinanData = {
  nama_kerajinan: string;
  id_kategori: number;
  deskripsi: string;
  gambar_url: string | string[] | null;
};

export type ExistingGambar = {
  type: "existing";
  url: string;
  markedForDelete: boolean;
};

export type NewGambar = {
  type: "new";
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url: string | null;
  error: string | null;
};

export type GambarItem = ExistingGambar | NewGambar;

export type Props = {
  id: number;
  kategori: Kategori[];
  data: KerajinanData;
};

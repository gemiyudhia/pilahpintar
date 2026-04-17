import { Kategori, KerajinanForm } from "@/types/types";

type InfoDasarSectionProps = {
  form: KerajinanForm;
  kategoriList: Kategori[];
  onChange: (updated: Partial<KerajinanForm>) => void;
};

export function InfoDasarSection({
  form,
  kategoriList,
  onChange,
}: InfoDasarSectionProps) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
          1
        </span>
        Informasi Dasar
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Kerajinan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Pot Tanaman dari Botol Plastik"
            value={form.nama_kerajinan}
            onChange={(e) => onChange({ nama_kerajinan: e.target.value })}
            className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori Sampah <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.id_kategori}
            onChange={(e) => onChange({ id_kategori: e.target.value })}
            className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">-- Pilih Kategori --</option>
            {kategoriList.map((k) => (
              <option key={k.id_kategori} value={k.id_kategori}>
                {k.nama_alias}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="Jelaskan secara singkat kerajinan ini..."
            value={form.deskripsi}
            onChange={(e) => onChange({ deskripsi: e.target.value })}
            className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

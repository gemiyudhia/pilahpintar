export function ResultNotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">
          Data tidak ditemukan
        </h2>
        <p className="text-slate-600">Silakan coba upload ulang gambar</p>
      </div>
    </div>
  );
}

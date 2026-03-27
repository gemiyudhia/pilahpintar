// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Database: 4 Kelas Utama (Tanpa Saran Singkat)...");

  const hashedPassword = await bcrypt.hash("adminpilahpintar", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  await prisma.kategori.upsert({
    where: { label_kelas: "plastic" },
    update: {},
    create: {
      label_kelas: "plastic",
      nama_alias: "Sampah Plastik",
      jenis_material: "Polimer (PET/PP/LDPE)",
      nilai_jual: 2500,
      rekomendasi: {
        create: {
          isi_konten: `STANDAR PENGELOLAAN (LHK No. 14/2021):
1. PEMILAHAN: Pisahkan plastik berdasarkan jenis jika memungkinkan (botol bening vs berwarna).
2. PENANGANAN:
   - Kosongkan seluruh isi cairan/makanan agar tidak membusuk.
   - Lepaskan label merk dan tutup botol.
   - Remukkan atau pipihkan wadah untuk menghemat ruang penyimpanan (reduksi volume).
3. MANFAAT: Plastik daur ulang dapat diolah menjadi bijih plastik, serat tekstil (baju jersey), atau produk kerajinan kreatif.`,
        },
      },
    },
  });

  await prisma.kategori.upsert({
    where: { label_kelas: "paper" },
    update: {},
    create: {
      label_kelas: "paper",
      nama_alias: "Sampah Kertas & Kardus",
      jenis_material: "Selulosa/Serat Kayu",
      nilai_jual: 1500,
      rekomendasi: {
        create: {
          isi_konten: `STANDAR PENGELOLAAN (LHK No. 14/2021):
1. PRINSIP UTAMA: Kertas harus dalam kondisi KERING dan BERSIH dari minyak/lemak.
2. PENANGANAN:
   - Lepaskan benda asing seperti staples, klip besi, atau lakban plastik.
   - Untuk kardus: Buka lipatan dan tekan hingga pipih (flat).
   - Untuk kertas lembaran: Jangan diremas, tumpuk dengan rapi.
3. LARANGAN: Kertas tisu, kertas nasi berminyak, atau kertas berlapis plastik tidak dapat didaur ulang (masuk residu).`,
        },
      },
    },
  });

  // LOGAM
  await prisma.kategori.upsert({
    where: { label_kelas: "metal" },
    update: {},
    create: {
      label_kelas: "metal",
      nama_alias: "Sampah Logam (Kaleng)",
      jenis_material: "Aluminium/Seng",
      nilai_jual: 8000,
      rekomendasi: {
        create: {
          isi_konten: `STANDAR PENGELOLAAN (LHK No. 14/2021):
1. KEBERSIHAN: Sisa makanan/minuman pada kaleng wajib dibersihkan untuk mencegah bau dan semut.
2. PENANGANAN:
   - Bilas kaleng dengan air.
   - Keringkan sejenak.
   - Injak atau gepengkan kaleng aluminium untuk efisiensi tempat.
3. POTENSI: Logam adalah material yang dapat didaur ulang 100% berulang kali tanpa penurunan kualitas (siklus tertutup).`,
        },
      },
    },
  });

  // KACA
  await prisma.kategori.upsert({
    where: { label_kelas: "glass" },
    update: {},
    create: {
      label_kelas: "glass",
      nama_alias: "Sampah Kaca/Beling",
      jenis_material: "Kaca (Silika)",
      nilai_jual: 500,
      rekomendasi: {
        create: {
          isi_konten: `STANDAR PENGELOLAAN (LHK No. 14/2021):
1. KEAMANAN: Hati-hati saat menangani agar tidak pecah dan melukai.
2. PENANGANAN:
   - Cuci bersih bagian dalam botol.
   - Lepas tutup botol (biasanya plastik/logam).
   - JANGAN MEMECAHKAN botol. Botol utuh lebih bernilai untuk digunakan ulang (Reuse) oleh pabrik.
3. PEMILAHAN: Jika memungkinkan, pisahkan berdasarkan warna kaca (Bening, Hijau, Coklat).`,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `label_kelas` VARCHAR(255) NOT NULL,
    `nama_alias` VARCHAR(255) NOT NULL,
    `jenis_material` VARCHAR(255) NOT NULL,
    `nilai_jual` DECIMAL(10, 2) NULL,
    `saran_singkat` VARCHAR(255) NULL,

    UNIQUE INDEX `kategori_label_kelas_key`(`label_kelas`),
    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rekomendasi` (
    `id_rekomendasi` INTEGER NOT NULL AUTO_INCREMENT,
    `isi_konten` TEXT NOT NULL,
    `id_kategori` INTEGER NOT NULL,

    UNIQUE INDEX `rekomendasi_id_kategori_key`(`id_kategori`),
    PRIMARY KEY (`id_rekomendasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_riwayat` (
    `id_riwayat` INTEGER NOT NULL AUTO_INCREMENT,
    `lokasi_gambar` VARCHAR(255) NOT NULL,
    `skor_akurasi` FLOAT NOT NULL,
    `waktu_deteksi` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_kategori` INTEGER NOT NULL,

    PRIMARY KEY (`id_riwayat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rekomendasi` ADD CONSTRAINT `rekomendasi_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id_kategori`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_riwayat` ADD CONSTRAINT `log_riwayat_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

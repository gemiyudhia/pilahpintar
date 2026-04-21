# 🌿 PilahPintar

**Sistem Rekomendasi Daur Ulang Sampah Berbasis Machine Learning**

PilahPintar adalah aplikasi web cerdas yang membantu pengguna mengidentifikasi jenis sampah secara real-time dan memberikan rekomendasi pengelolaan daur ulang yang tepat menggunakan model deteksi objek **YOLOv8** yang di-host di **Hugging Face Spaces**. Dibangun di atas **Next.js** dan **Supabase**, PilahPintar menghadirkan pengalaman yang cepat, modern, dan skalabel tanpa perlu mengelola inference server sendiri.

---

## ✨ Fitur Utama

- **Deteksi Sampah Real-time** — Identifikasi dan lokalisasi objek sampah dalam gambar menggunakan YOLOv8
- **Rekomendasi Daur Ulang** — Panduan pengelolaan sampah yang dipersonalisasi berdasarkan hasil deteksi
- **Autentikasi Pengguna** — Login aman via Supabase Auth (email, Google, dll.)

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **[Next.js 14](https://nextjs.org/)** — React framework dengan App Router & Server Actions
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** — Static typing

### Backend & Database
- **[Supabase](https://supabase.com/)** — Backend-as-a-Service: PostgreSQL database, Auth, Storage, dan Realtime

### Machine Learning
- **[YOLOv8](https://docs.ultralytics.com/)** (Ultralytics) — Model deteksi objek untuk klasifikasi sampah
- **[Hugging Face Spaces](https://huggingface.co/spaces)** — Hosting inference API YOLOv8 via Gradio
- **[Hugging Face Inference API](https://huggingface.co/docs/api-inference)** — REST API untuk memanggil model

---

## 🚀 Memulai

### Prasyarat

Pastikan sudah disiapkan:
- **Node.js** >= 18.x
- **npm** / **yarn** / **pnpm**
- Akun [Supabase](https://supabase.com/)
- Akun [Hugging Face](https://huggingface.co/) + model YOLOv8 sudah di-deploy ke Spaces

### 1. Clone Repositori

```bash
git clone https://github.com/gemiyudhia/pilahpintar.git
cd pilahpintar
```

### 2. Deploy Model ke Hugging Face Spaces

> Lewati langkah ini jika model sudah tersedia di Spaces.

Buat Space baru di Hugging Face dengan SDK **Gradio**, lalu upload file berikut:

```
your-hf-space/
├── app.py
├── best.pt          
└── requirements.txt
```

**`app.py`** (contoh):

```python
import gradio as gr
from ultralytics import YOLO
from PIL import Image

model = YOLO("best.pt")

LABELS = ['organik', 'plastik', 'kertas', 'logam', 'kaca', 'b3', 'residu']

def predict(image: Image.Image):
    results = model(image)
    detections = []
    for box in results[0].boxes:
        detections.append({
            "label": LABELS[int(box.cls)],
            "confidence": round(float(box.conf), 4),
            "bbox": box.xyxy[0].tolist(),
        })
    return detections

demo = gr.Interface(fn=predict, inputs=gr.Image(type="pil"), outputs="json")
demo.launch()
```

**`requirements.txt`**:

```
ultralytics
gradio
Pillow
```

Setelah di-deploy, catat URL Space kamu:
```
https://huggingface.co/spaces/<username>/<space-name>
```

### 3. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com/)
2. Aktifkan **Storage** dan buat bucket

### 4. Konfigurasi Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Hugging Face
HF_SPACE_URL=https://gemiyudhia-pilahpintar-model.hf.space
HF_API_TOKEN=hf_xxxxxxxxxxxxxxxxxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Instalasi & Jalankan Next.js

```bash
npm install
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`

## 🤝 Kontribusi

Kontribusi sangat disambut! Berikut cara berkontribusi:

1. **Fork** repositori ini
2. Buat branch fitur baru: `git checkout -b fitur/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambahkan fitur X'`
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buat **Pull Request**

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

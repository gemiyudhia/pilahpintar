import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-gray-50 rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block relative">
            <div className=""></div>
            <Image
              className="relative z-10 w-full object-cover"
              src="/person-detecting_enhanced.jpg"
              alt="Tentang PilahPintar"
              width={600}
              height={500}
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Mengenal <span className="text-green-600">PilahPintar</span>
            </h2>

            <div className="w-20 h-1 bg-green-500 mx-auto lg:mx-0 mb-8 rounded-full"></div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Indonesia menghasilkan jutaan ton sampah setiap tahunnya, namun
                tingkat daur ulang masih rendah karena sulitnya proses
                pemilahan. PilahPintar hadir sebagai solusi cerdas.
              </p>
              <p>
                Menggabungkan teknologi <em>Artificial Intelligence</em>{" "}
                (YOLOv8) terkini, aplikasi ini membantu Anda mengenali jenis
                sampah anorganik seperti Plastik, Kertas, Logam, dan Kaca.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

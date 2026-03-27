import WasteCard from "@/components/features/WastedCard";
import { WASTE_CATEGORIES } from "@/data/landing-page";

export default function WasteCategorySection() {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Kenali Jenis Sampahmu
          </h2>
          <p className="text-gray-600 text-lg">
            Sistem kami dapat mendeteksi 4 kategori utama ini secara real-time
            menggunakan kamera Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WASTE_CATEGORIES.map((item, index) => (
            <WasteCard
              key={index}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              categoryType={item.categoryType}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { HOW_IT_WORKS_STEPS } from "@/data/landing-page";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-sm max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="text-center lg:text-left lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Cara Kerja <br />
              <span className="text-green-600">PilahPintar</span>
            </h2>
            <p className="text-gray-500 mb-8">
              Teknologi canggih yang mudah digunakan siapa saja.
            </p>
            <Link href="/detect">
              <Button className="hidden lg:block px-8 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30 cursor-pointer">
                Coba Sekarang
              </Button>
            </Link>
          </div>

          <div className="w-full lg:w-2/3 space-y-8">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-6 group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-green-100"
              >
                <div className="shrink-0 w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-sm -600 group-hover:text-white">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            <Link href="/detect">
              <Button className="w-full lg:hidden mt-8 px-6 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg">
                Coba Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

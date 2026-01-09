import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionButton() {
  return (
    <Link href="/detect" className="block w-full">
      <Button className="w-full h-12 text-base font-bold rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-100 transition-all group cursor-pointer">
        Deteksi Lagi
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  );
}

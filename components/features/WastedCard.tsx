import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WasteCardProps {
  title: string;
  description: string;
  imageSrc: string;
  categoryType: "plastic" | "paper" | "metal" | "glass";
}

export default function WasteCard({
  title,
  description,
  imageSrc,
  categoryType,
}: WasteCardProps) {
  // Konfigurasi Warna & Badge berdasarkan tipe
  const config = {
    plastic: {
      color: "text-blue-600",
      badgeVariant: "default",
      badgeLabel: "Plastik",
      hoverBorder: "hover:border-blue-500",
    },
    paper: {
      color: "text-yellow-600",
      badgeVariant: "secondary",
      badgeLabel: "Kertas",
      hoverBorder: "hover:border-yellow-500",
    },
    metal: {
      color: "text-slate-600",
      badgeVariant: "outline",
      badgeLabel: "Logam",
      hoverBorder: "hover:border-slate-500",
    },
    glass: {
      color: "text-green-600",
      badgeVariant: "outline", // Bisa dicustom classnya nanti
      badgeLabel: "Kaca",
      hoverBorder: "hover:border-green-500",
    },
  };

  const theme = config[categoryType];

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-2 ${theme.hoverBorder}`}
    >
      {/* BAGIAN GAMBAR (Full Width di atas) */}
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Badge melayang di atas gambar */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={theme.badgeVariant as any}
            className="bg-white/90 text-black hover:bg-white backdrop-blur-sm"
          >
            {theme.badgeLabel}
          </Badge>
        </div>
      </div>

      {/* HEADER & JUDUL */}
      <CardHeader>
        <CardTitle className={`text-xl font-bold ${theme.color}`}>
          {title}
        </CardTitle>
      </CardHeader>

      {/* ISI DESKRIPSI */}
      <CardContent>
        <CardDescription className="line-clamp-3 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

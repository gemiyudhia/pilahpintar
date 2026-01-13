"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. Definisikan Warna berdasarkan Label YOLO
const COLORS_MAP: Record<string, string> = {
  plastic: "#3b82f6", // Blue-500
  paper: "#eab308", // Yellow-500
  metal: "#64748b", // Slate-500
  glass: "#10b981", // Emerald-500
  organic: "#22c55e", // Green-500
  default: "#8b5cf6", // Violet-500 (untuk yang tidak dikenal)
};

// 2. Interface Props
interface ChartData {
  name: string;
  value: number;
  label: string;
}

export function WasteDistributionChart({ data }: { data: ChartData[] }) {
  // Jika data kosong, tampilkan pesan
  if (!data || data.length === 0) {
    return (
      <Card className="border-0 shadow-sm h-full min-h-87.5 flex items-center justify-center">
        <p className="text-gray-400">Belum ada data distribusi sampah.</p>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg">Distribusi Sampah</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60} // Membuat efek Donut Chart
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => {
                  // Tentukan warna berdasarkan label_kelas (misal: 'plastic')
                  // Kalau label ada 'plastic' pakai warna biru, dst.
                  let color = COLORS_MAP["default"];

                  const labelLower = entry.label.toLowerCase();
                  if (labelLower.includes("plastic"))
                    color = COLORS_MAP["plastic"];
                  else if (
                    labelLower.includes("paper") ||
                    labelLower.includes("cardboard")
                  )
                    color = COLORS_MAP["paper"];
                  else if (
                    labelLower.includes("metal") ||
                    labelLower.includes("can")
                  )
                    color = COLORS_MAP["metal"];
                  else if (labelLower.includes("glass"))
                    color = COLORS_MAP["glass"];
                  else if (labelLower.includes("organic"))
                    color = COLORS_MAP["organic"];

                  return (
                    <Cell key={`cell-${index}`} fill={color} stroke="none" />
                  );
                })}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} Deteksi`, "Jumlah"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

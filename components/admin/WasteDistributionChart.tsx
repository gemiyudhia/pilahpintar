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

const COLORS_MAP: Record<string, string> = {
  plastic: "#3b82f6",
  paper: "#eab308",
  metal: "#64748b",
  glass: "#10b981",
  organic: "#22c55e",
  default: "#8b5cf6",
};

interface ChartData {
  name: string;
  value: number;
  label: string;
}

export function WasteDistributionChart({ data }: { data: ChartData[] }) {
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
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => {
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

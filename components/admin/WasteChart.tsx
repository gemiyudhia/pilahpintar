"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DATA = [
  { name: "Jan", Plastik: 40, Kertas: 24, Logam: 24 },
  { name: "Feb", Plastik: 30, Kertas: 13, Logam: 22 },
  { name: "Mar", Plastik: 20, Kertas: 58, Logam: 22 },
  { name: "Apr", Plastik: 27, Kertas: 39, Logam: 20 },
  { name: "Mei", Plastik: 18, Kertas: 48, Logam: 21 },
  { name: "Jun", Plastik: 23, Kertas: 38, Logam: 25 },
];

export function WasteChart() {
  return (
    <Card className="col-span-4 border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Statistik Deteksi Sampah (Semester Ini)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-87.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />

              <Bar
                dataKey="Plastik"
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
                name="Plastik"
              />
              <Bar
                dataKey="Kertas"
                fill="#eab308"
                radius={[4, 4, 0, 0]}
                name="Kertas"
              />
              <Bar
                dataKey="Logam"
                fill="#94a3b8"
                radius={[4, 4, 0, 0]}
                name="Logam"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

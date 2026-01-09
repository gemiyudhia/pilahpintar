"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// 1. DATA SAMPAH
const chartData = [
  { browser: "plastik", visitors: 275, fill: "#22c55e" }, // Green
  { browser: "kertas", visitors: 200, fill: "#eab308" }, // Yellow
  { browser: "logam", visitors: 187, fill: "#64748b" }, // Slate
  { browser: "kaca", visitors: 173, fill: "#ef4444" }, // Red
  { browser: "organik", visitors: 90, fill: "#a8a29e" }, // Stone
];

// 2. KONFIGURASI LABEL & WARNA
const chartConfig = {
  visitors: {
    label: "Jumlah",
  },
  plastik: {
    label: "Plastik (PET)",
    color: "hsl(var(--chart-1))",
  },
  kertas: {
    label: "Kertas/Kardus",
    color: "hsl(var(--chart-2))",
  },
  logam: {
    label: "Logam/Kaleng",
    color: "hsl(var(--chart-3))",
  },
  kaca: {
    label: "Kaca/Beling",
    color: "hsl(var(--chart-4))",
  },
  organik: {
    label: "Organik",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function WasteDistributionChart() {
  // Hitung total untuk ditampilkan di tengah donat
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col border-0 shadow-sm h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribusi Sampah</CardTitle>
        <CardDescription>Januari - Juni 2026</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              {/* Label Total di Tengah */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Item
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Meningkat 5.2% bulan ini <span className="text-green-600">▲</span>
        </div>
        <div className="leading-none text-muted-foreground text-center">
          Menampilkan total deteksi berdasarkan kategori sampah
        </div>
      </CardFooter>
    </Card>
  );
}

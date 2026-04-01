import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const KATEGORI_MAP: Record<string, number> = {
  plastic: 1,
  paper: 2,
  metal: 3,
  glass: 4,
};

export function mapLabelToKategori(label: string): number {
  return KATEGORI_MAP[label] ?? 0;
}

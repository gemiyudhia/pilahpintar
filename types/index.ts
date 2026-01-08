type WasteType = "plastic" | "paper" | "metal" | "glass";

export interface WasteCategory {
  title: string;
  description: string;
  imageSrc: string;
  categoryType: WasteType;
}

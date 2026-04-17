type WasteType = "plastic" | "paper" | "metal" | "glass";

export interface WasteCategory {
  title: string;
  description: string;
  imageSrc: string;
  categoryType: WasteType;
}

export type Detection = {
  label: string;
  confidence: number;
};

export type Label = "plastic" | "metal" | "paper" | "glass";

export type Recommendation = {
  description: string;
  steps: string[];
  nilai_jual?: number;
};

export type ApiResponse = [
  string | { url: string },
  {
    status: string;
    message?: string;
    data: Detection[];
  },
];

export type DetectionResult = {
  id: string;
  label: string;
  confidence: number;
  description: string;
  imageUrl: string;
  nilaiJual?: number;
};

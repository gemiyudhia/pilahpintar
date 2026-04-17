import { KerajinanData } from "./types";

export function parseExistingUrls(
  gambar_url: KerajinanData["gambar_url"],
): string[] {
  if (Array.isArray(gambar_url)) return gambar_url;
  if (gambar_url) return [gambar_url];
  return [];
}

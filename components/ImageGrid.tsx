import Image from "next/image";

type Gambar =
  | { type: "existing"; url: string; deleted: boolean }
  | { type: "new"; preview: string };

export default function ImageGrid({
  gambar,
  setGambar,
}: {
  gambar: Gambar[];
  setGambar: React.Dispatch<React.SetStateAction<Gambar[]>>;
}) {
  const toggleDelete = (i: number) => {
    setGambar((prev) =>
      prev.map((g, idx) =>
        idx === i && g.type === "existing" ? { ...g, deleted: !g.deleted } : g,
      ),
    );
  };

  const removeNew = (i: number) => {
    setGambar((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {gambar.map((g, i) => (
        <div key={i} className="relative aspect-square">
          <Image
            src={g.type === "existing" ? g.url : g.preview}
            alt=""
            fill
            className={`object-cover rounded ${
              g.type === "existing" && g.deleted ? "opacity-30" : ""
            }`}
          />

          {g.type === "existing" && (
            <button
              type="button"
              onClick={() => toggleDelete(i)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
            >
              {g.deleted ? "Undo" : "X"}
            </button>
          )}

          {g.type === "new" && (
            <button
              type="button"
              onClick={() => removeNew(i)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
            >
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  isCameraMode: boolean;
  onToggle: (isCamera: boolean) => void;
}

export function ModeToggle({ isCameraMode, onToggle }: ModeToggleProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white p-1 rounded-full border border-gray-200 shadow-sm flex items-center relative w-64 mx-auto">
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-green-600 rounded-full transition-all duration-300 shadow-sm ${
            isCameraMode ? "left-[calc(50%+2px)]" : "left-1"
          }`}
        ></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggle(false)}
          className={`relative z-10 w-1/2 rounded-full transition-colors hover:bg-transparent ${
            !isCameraMode
              ? "text-white hover:text-white"
              : "text-gray-500 hover:text-green-600"
          }`}
        >
          <Upload className="w-4 h-4 mr-2" /> Upload
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggle(true)}
          className={`relative z-10 w-1/2 rounded-full transition-colors hover:bg-transparent ${
            isCameraMode
              ? "text-white hover:text-white"
              : "text-gray-500 hover:text-green-600"
          }`}
        >
          <Camera className="w-4 h-4 mr-2" /> Kamera
        </Button>
      </div>
    </div>
  );
}

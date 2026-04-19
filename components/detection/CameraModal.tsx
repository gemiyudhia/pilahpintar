import { X, Loader2 } from "lucide-react";

interface CameraModalProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  cameraLoading: boolean;
  cameraError: string | null;
  onClose: () => void;
  onCapture: () => void;
}

export default function CameraModal({
  videoRef,
  canvasRef,
  cameraLoading,
  cameraError,
  onClose,
  onCapture,
}: CameraModalProps) {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-end z-20">
          <button
            onClick={onClose}
            className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 backdrop-blur-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative aspect-3/4 bg-gray-900 w-full">
          {cameraLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-10">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          )}

          {cameraError ? (
            <div className="flex items-center justify-center h-full px-8 text-center">
              <p className="text-red-400">{cameraError}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {!cameraError && (
          <div className="p-6 bg-gray-900 flex justify-center pb-8">
            <button
              onClick={onCapture}
              disabled={cameraLoading}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none ring-4 ring-transparent hover:ring-green-500/50"
            >
              <div className="w-16 h-16 bg-white rounded-full border-2 border-black/10" />
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}

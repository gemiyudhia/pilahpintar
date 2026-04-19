import { useRef, useState, useEffect } from "react";

export interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  showCamera: boolean;
  cameraLoading: boolean;
  cameraError: string | null;
  openCameraModal: () => void;
  closeCameraModal: () => void;
  capturePhoto: (onCapture: (file: File) => void) => void;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    return () => stopTracks();
  }, []);

  useEffect(() => {
    if (showCamera) {
      initializeCamera();
    } else {
      stopTracks();
    }
  }, [showCamera]);

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const initializeCamera = async () => {
    setCameraLoading(true);
    setCameraError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraLoading(false);
        };
      }
    } catch {
      setCameraError(
        "Tidak dapat mengakses kamera. Pastikan izin diberikan atau gunakan HTTPS.",
      );
      setCameraLoading(false);
    }
  };

  const openCameraModal = () => setShowCamera(true);

  const closeCameraModal = () => {
    setShowCamera(false);
    setCameraError(null);
  };

  const capturePhoto = (onCapture: (file: File) => void) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!video || !canvas || !context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `camera-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          onCapture(file);
          closeCameraModal();
        }
      },
      "image/jpeg",
      0.9,
    );
  };

  return {
    videoRef,
    canvasRef,
    showCamera,
    cameraLoading,
    cameraError,
    openCameraModal,
    closeCameraModal,
    capturePhoto,
  };
}

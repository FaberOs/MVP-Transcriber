import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface UploadNotificationProps {
  fileName: string;
  isUploading: boolean;
  onUploadComplete: () => void; // Función para actualizar la tabla
}

export function UploadNotification({
  fileName,
  isUploading,
  onUploadComplete,
}: UploadNotificationProps) {
  useEffect(() => {
    if (isUploading) {
      const toastId = toast.loading(`Subiendo archivo...`, {
        id: "upload",
        position: "bottom-right",
        style: {
          minWidth: "250px",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          color: "#000000",
          animation: "slide-up 0.5s ease-out",
        },
      });

      setTimeout(() => {
        toast.success(`Archivo subido`, {
          id: "upload",
          position: "bottom-right",
          style: {
            minWidth: "250px",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        });
        onUploadComplete(); // Actualiza la tabla después de mostrar el éxito
      }, 3000);
    }
  }, [isUploading, fileName, onUploadComplete]);

  return <Toaster />;
}

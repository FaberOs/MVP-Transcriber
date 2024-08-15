import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import CloseIcon from "@/components/Icons/CloseIcon";
import PlusIcon from "../Icons/PlusIcon";
import { useDropzone } from "react-dropzone";
import Button from "./Button";
import { UploadNotification } from "./UploadToast";

/* ----- MODAL BASE ----- */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg relative">
        {children}
      </div>
    </div>,
    document.body
  );
}

/* ----- UPLOAD MODAL ----- */

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function UploadModal({
  isOpen,
  onClose,
  onUploadComplete,
}: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState("Prueba");
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadToast, setShowUploadToast] = useState(false); // Nuevo estado
  const [uploadedFileName, setUploadedFileName] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "audio/mp3": [], "video/mp4": [] },
    maxSize: 400 * 1024 * 1024, // 400MB
    onDrop,
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setShowUploadToast(true); // Inicia el UploadToast
    setUploadedFileName(files[0].name);

    const newProject = {
      description,
      status: "EN PROGRESO",
      createdAt: new Date().toISOString(),
      urlPrincipalThumbnail: "https://via.placeholder.com/150",
      numParts: 1,
      url: "https://example.com/newvideo.mp4",
      urlSubtitles: "https://example.com/newsubs.vtt",
    };

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        console.log("Proyecto agregado:", await response.json());
        setIsUploading(false);

        // Cierra el modal aquí para asegurarse de que no afecte el UploadToast
        onClose();
      } else {
        console.error("Error al agregar proyecto");
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsUploading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sube tus archivos</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-400"
            >
              <CloseIcon height={20} width={20} />
            </button>
          </div>
          <hr className="mb-4" />

          {/* Body */}
          <div className="flex flex-col flex-grow overflow-auto">
            {files.length === 0 ? (
              <div
                {...getRootProps({
                  className:
                    "border-dashed border-2 border-gray-300 rounded py-10 mb-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 text-sm gap-1 cursor-pointer",
                })}
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                  <PlusIcon height={20} width={20} />
                </p>
                <p className="text-gray-600">Arrastra tus archivos aquí</p>
                <p className="text-gray-600">
                  o <strong className="text-[#FCA51D]">explora</strong>
                </p>
              </div>
            ) : (
              <div className="flex flex-col flex-grow overflow-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b border-gray-200"
                  >
                    <span className="text-gray-600">{file.name}</span>
                    <span className="text-gray-500 text-sm">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}
            {files.length === 0 && (
              <div className="flex justify-between text-gray-500 text-sm mt-4">
                <span>Formatos permitidos: mp3, mp4</span>
                <span>Peso máximo: 400 MB</span>
              </div>
            )}
          </div>
          <hr className="my-4" />

          {/* Footer */}
          <div
            className={clsx(
              "flex space-x-2",
              files.length === 0 ? "justify-end" : "justify-between"
            )}
          >
            {files.length > 0 && (
              <Button
                variant="outline"
                size="large"
                onClick={open}
                label="Subir más"
              />
            )}
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="large"
                onClick={onClose}
                label="Cancelar"
              />
              <Button
                variant="primary"
                size="large"
                onClick={handleUpload}
                label={files.length === 0 ? "Cargar" : "Continuar"}
              />
            </div>
          </div>
        </div>
      </Modal>
      {showUploadToast && (
        <UploadNotification
          fileName={uploadedFileName}
          isUploading={isUploading}
          onUploadComplete={() => {
            setShowUploadToast(false); // Oculta el UploadToast después de completar
            onUploadComplete(); // Actualiza la tabla
          }}
        />
      )}
    </>
  );
}

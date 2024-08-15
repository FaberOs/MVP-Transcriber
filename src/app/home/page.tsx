"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Suspense } from "react";
import Image from "next/image";
import Button from "@/components/Common/Button";
import PlusIcon from "@/components/Icons/PlusIcon";
import CopyIcon from "@/components/Icons/CopyIcon";
import VoidHomePic from "../../../public/VoidHomePic.png";
import { useState, useEffect } from "react";
import ProjectsList from "@/components/Projects/ProjectsList";
import { UploadModal } from "@/components/Common/Modal";

export default function HomePage() {
  const { data: session } = useSession();
  const [showSignOut, setShowSignOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleClick = () => {
    signOut();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProjectUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching updated projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {session ? (
        <div className="flex flex-col items-center lg:px-2 xl:px-14">
          {/* Profile photo aligned to the right */}
          <div className="flex justify-end w-full lg:px-2 lg:pt-2 xl:pt-6">
            <div className="relative">
              <Image
                src={session.user?.image as string}
                alt={`foto de perfil de ${session.user?.name}`}
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={() => setShowSignOut(!showSignOut)}
              />
              {showSignOut && (
                <button
                  onClick={handleClick}
                  className="absolute right-0 top-12 p-2 bg-gray-200 rounded shadow-lg"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Centered welcome message */}
          <h1 className="text-center lg:text-2xl font-semibold lg:mb-8 xl:text-3xl xl:mb-14">
            Hola, {session.user?.name}!
          </h1>

          {/* Centered search bar and buttons */}
          <div className="w-full xl:max-w-5xl lg:max-w-3xl mx-auto mb-4 px-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 p-1 border rounded lg:text-lg xl:text-xl"
              />
              <Button
                label="Nuevo"
                icon={<PlusIcon />}
                variant="primary"
                size="medium"
                onClick={handleOpenModal}
              />
              <Button
                label="Nueva carpeta"
                icon={<CopyIcon />}
                variant="outline"
                size="medium"
                onClick={alert}
              />
            </div>
          </div>

          {/* Gray divider line */}
          <div className="w-11/12 border-t border-gray-200 xl:mt-2"></div>

          {loading ? (
            <div className="text-center mt-4">Cargando proyectos...</div>
          ) : projects.length > 0 ? (
            <Suspense fallback={<>Loading...</>}>
              <ProjectsList searchTerm={searchTerm} />
            </Suspense>
          ) : (
            <>
              <Image
                src={VoidHomePic}
                alt="HomePic"
                width={358}
                height={239}
                className="mb-4 xl:mb-10 xl:mt-20 lg:mt-2 lg:w-72 lg:h-48"
              />
              <div className="text-center mb-4 lg:mb-6">
                <p className="text-xl font-semibold mb-2 xl:text-2xl">
                  No tienes archivos aún
                </p>
                <p className="text-gray-400 text-xs mb-1 xl:text-sm">
                  Simplifica tu trabajo y genera transcripciones de manera
                  eficiente
                </p>
                <p className="text-gray-400 text-xs xl:text-sm">
                  Sube tu primer archivo para continuar
                </p>
              </div>
              <Button
                label="Nuevo"
                icon={<PlusIcon />}
                variant="outline"
                size="medium"
                onClick={handleOpenModal}
              />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
      <UploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUploadComplete={handleProjectUpdate}
      />
    </Suspense>
  );
}

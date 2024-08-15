import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";

interface Project {
  id: string;
  description: string;
  status: string;
  createdAt: string;
}

interface ProjectsListProps {
  searchTerm: string;
}

async function fetchProjects() {
  try {
    const response = await fetch("http://localhost:5000/api/projects", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // Verifica los datos en la consola
    return data; // Devuelve la lista directamente
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Devuelve una lista vacía en caso de error
  }
}

function ProjectsList({ searchTerm }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data); // Usa la lista de proyectos directamente
      setLoading(false);
    };

    getProjects();
  }, []);

  const refreshProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "Descripción",
      selector: (row: Project) => row.description || "Desconocido",
      sortable: true,
      wrap: true,
    },
    {
      name: "ID",
      selector: (row: Project) => row.id,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row: Project) => row.status,
      sortable: true,
    },
    {
      name: "Fecha de Creación",
      selector: (row: Project) =>
        row.createdAt
          ? dayjs(row.createdAt).format("DD/MM/YYYY")
          : "Desconocido",
      sortable: true,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <DataTable
        columns={columns}
        data={filteredProjects}
        pagination
        progressPending={loading}
        progressComponent={<div>Cargando...</div>}
      />
    </div>
  );
}

export default ProjectsList;

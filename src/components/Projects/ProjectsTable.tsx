import React from "react";
import DataTable from "react-data-table-component";

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  // Definir las columnas de la tabla
  const columns = [
    {
      name: "Project Name",
      selector: (row: Project) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Project) => row.description,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row: Project) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row: Project) => row.endDate,
      sortable: true,
    },
    // Puedes agregar más columnas según sea necesario
  ];

  return (
    <DataTable title="Projects" columns={columns} data={projects} pagination />
  );
};

export default ProjectsTable;

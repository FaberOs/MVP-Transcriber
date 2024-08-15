import { adapters } from "./adapters";
import { API_PATHS } from "@/utils/constants";
import { IExample, IProject } from "@/utils/models";
import { IServerExample, IServerProject } from "@/services/graph";

const getProject = async ({
  uuid,
}: {
  uuid: string;
}): Promise<IProject | undefined> => {
  const url = API_PATHS.GET_VIDEO({ uuid });
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();

  if (data.videos.length === 0) {
    return undefined;
  }

  return adapters.adaptProject(data.videos[0]);
};

export const getExamples = async ({ uuid }: { uuid: string }) => {
  const url = API_PATHS.GET_EXAMPLES({ uuid });
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw "Error al obtener los ejemplos";
  }

  const data: IServerExample[] = await response.json();
  return data.map(adapters.adaptExample);
};

export const getProjects = async ({
  page,
  size,
}: {
  page?: string;
  size?: string;
}): Promise<IProject[]> => {
  const response = await fetch(API_PATHS.GET_VIDEOS(page, size), {
    method: "GET",
    cache: "no-cache",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw "Error al obtener los proyectos";
  }

  const data = await response.json();
  /* console.log("Datos del servidor:", data); */
  return data.videos.map(adapters.adaptProject);
};

const createProject = async ({
  name,
  files,
}: {
  name: string;
  files: FileList;
}): Promise<string> => {
  if (files.length === 0) {
    throw "Debes cargar un archivo.";
  }

  if (files.length > 1) {
    throw "Solo puedes cargar un archivo.";
  }

  try {
    const file = files[0];

    // Validar tipos de archivo permitidos
    const validFileTypes = [
      "video/mp4",
      "audio/mp3",
      "video/mpeg",
      "audio/mpeg",
      "audio/wav",
      "video/x-matroska",
    ];
    if (!validFileTypes.includes(file.type)) {
      throw "El archivo debe ser uno de los siguientes formatos: .mp4, .mp3, .mpeg, .wav, .mkv.";
    }

    const formattedFileName = file.name.replace(/ /g, "");

    const url = API_PATHS.PUT_VIDEO();

    const responseCreate = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        original_filename: formattedFileName,
        description: name,
        metadata: "",
      }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!responseCreate.ok) {
      throw "Error al crear el proyecto.";
    }

    const data = await responseCreate.json();

    const { id, upload_signed_url } = data;

    const responseUpload = await fetch(upload_signed_url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!responseUpload.ok) {
      throw "Error al subir el archivo.";
    }

    return id;
  } catch (error) {
    throw "Error al crear el proyecto.";
  }
};

const putExamples = async ({
  examples,
  projectId,
}: {
  examples: IExample[];
  projectId: string;
}) => {
  const url = API_PATHS.PUT_EXAMPLES(projectId);

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(
      examples.map((voice) => {
        return {
          label: voice.voiceId,
          id: voice.id,
        };
      })
    ),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw "Error al actualizar los ejemplos";
  }

  const data = await response.json();
  return data;
};

const downloadFile = async ({
  fileType = "vtt",
  videoId,
}: {
  videoId: string;
  fileType?: string;
}): Promise<string> => {
  const url = API_PATHS.DOWNLOAD;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      videoId,
      fileType,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.downloadUrl;
};

const editWord = async ({
  multimedia_id,
  segment_id,
  word_id,
  word,
}: {
  multimedia_id: string;
  segment_id: string;
  word_id: number;
  word: string;
}) => {
  const url = API_PATHS.EDIT_WORD({ multimedia_id, segment_id, word_id });
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ word }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw "Error al editar la palabra";
  }

  const data = await response.json();
  return data;
};

const deleteWord = async ({
  multimedia_id,
  segment_id,
  word_id,
}: {
  multimedia_id: string;
  segment_id: string;
  word_id: number;
}) => {
  const url = API_PATHS.DELETE_WORD({ multimedia_id, segment_id, word_id });
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw "Error al eliminar la palabra";
  }

  const data = await response.json();
  return data;
};

const createWord = async ({
  multimedia_id,
  segment_id,
  word,
  start_time,
  end_time,
}: {
  multimedia_id: string;
  segment_id: string;
  word: string;
  start_time: number;
  end_time: number;
}) => {
  const url = API_PATHS.CREATE_WORD({ multimedia_id, segment_id });
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ word, start_time, end_time }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw "Error al crear la palabra";
  }

  const data = await response.json();
  return data;
};

const getWords = async ({
  multimedia_id,
  segment_id,
}: {
  multimedia_id: string;
  segment_id: string;
}) => {
  const url = API_PATHS.GET_WORDS({ multimedia_id, segment_id });
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  if (!response.ok) {
    throw "Error al obtener las palabras";
  }

  const data = await response.json();
  return data;
};

const getSegments = async ({ multimedia_id }: { multimedia_id: string }) => {
  const url = API_PATHS.GET_SEGMENTS({ multimedia_id });
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los segmentos");
  }

  const data = await response.json();
  return data;
};

export const api = {
  createProject,
  downloadFile,
  getExamples,
  getProjects,
  putExamples,
  getProject,
  editWord,
  deleteWord,
  createWord,
  getWords,
  getSegments,
};

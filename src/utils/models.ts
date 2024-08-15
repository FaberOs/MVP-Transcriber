export type TProjectStatus =
  | "CARGADO"
  | "CREADO"
  | "ETIQUETADO"
  | "TRANSCRIPCION_GENERADA"
  | "PROCESO_DE_ETIQUETADO";

export interface IProject {
  createdAt?: string;
  id: string;
  description?: string;
  status?: TProjectStatus;
  url?: string;
  urlPrincipalThumbnail?: string;
  urlSubtitles?: string;
}

export interface IExample {
  endTime: number;
  id: number;
  segmentId: number;
  startTime: number;
  text: string;
  voiceId?: string;
  isCurrent: boolean;
}

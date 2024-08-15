import { TProjectStatus } from "@/utils/models";

export interface IServerProject {
  created_at?: string;
  description?: string;
  id: string;
  status?: TProjectStatus;
  url_principal_thumbnail?: string;
  url_subtitles?: string;
  url?: string;
}

export interface IServerExample {
  end_time: number;
  id: number;
  segment_id: number;
  start_time: number;
  text: string;
  voice_id?: string;
}

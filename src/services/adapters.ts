import { IExample, IProject } from "@/utils/models";
import { IServerExample, IServerProject } from "@/services/graph";

export const adaptProject = (response: IServerProject): IProject => {
  return {
    createdAt: response.created_at,
    id: response.id,
    description: response.description,
    status: response.status,
    url: response.url,
    urlPrincipalThumbnail: response.url_principal_thumbnail,
    urlSubtitles: response.url_subtitles,
  };
};

export const adaptExample = (response: IServerExample): IExample => {
  return {
    endTime: response.end_time,
    id: response.id,
    segmentId: response.segment_id,
    startTime: response.start_time,
    text: response.text,
    voiceId: response.voice_id,
    isCurrent: false,
  };
};

export const adapters = {
  adaptProject,
  adaptExample,
};

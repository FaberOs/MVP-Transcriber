import HomeIcon from "@/components/Icons/HomeIcon";
import CopyIcon from "@/components/Icons/CopyIcon";
import TimeIcon from "@/components/Icons/TimeIcon";
import StarIcon from "@/components/Icons/StarIcon";

export const API_PATHS = {
  BASE: "https://xirius-captionwave-back-7nruwq44la-uk.a.run.app",
  DOWNLOAD:
    "https://us-east4-hemisferio-d.cloudfunctions.net/python-generate-output",
  BASE_URL: "http://localhost:5000/api",
  PUT_VIDEO: () => {
    return API_PATHS.BASE + `/videos`;
  },
  GET_VIDEO: ({ uuid }: { uuid: string }) => {
    return API_PATHS.BASE + `/videos?uuid=${uuid}`;
  },
  GET_EXAMPLES: ({ uuid }: { uuid: string }) => {
    return API_PATHS.BASE + `/videos/${uuid}/voice_samples`;
  },
  PUT_EXAMPLES: (uuid: string) => {
    return API_PATHS.BASE + `/videos/${uuid}/voice_samples`;
  },
  GET_VIDEOS: (page?: string, size?: string) => {
    const searchParams = new URLSearchParams();
    page && searchParams.set("page", page.toString());
    size && searchParams.set("size", size.toString());
    return API_PATHS.BASE_URL + `/videos?${searchParams.toString()}`;
  },
  GET_SEGMENTS: ({ multimedia_id }: { multimedia_id: string }) => {
    return API_PATHS.BASE_URL + `/multimedia/${multimedia_id}`;
  },
  // New API paths
  EDIT_WORD: ({
    multimedia_id,
    segment_id,
    word_id,
  }: {
    multimedia_id: string;
    segment_id: string;
    word_id: number;
  }) => {
    return `${API_PATHS.BASE_URL}/multimedia/${multimedia_id}/transcript/segment/${segment_id}/words/${word_id}`;
  },
  DELETE_WORD: ({
    multimedia_id,
    segment_id,
    word_id,
  }: {
    multimedia_id: string;
    segment_id: string;
    word_id: number;
  }) => {
    return `${API_PATHS.BASE_URL}/multimedia/${multimedia_id}/transcript/segment/${segment_id}/words/${word_id}`;
  },
  CREATE_WORD: ({
    multimedia_id,
    segment_id,
  }: {
    multimedia_id: string;
    segment_id: string;
  }) => {
    return `${API_PATHS.BASE_URL}/multimedia/${multimedia_id}/transcript/segment/${segment_id}/words`;
  },
  GET_WORDS: ({
    multimedia_id,
    segment_id,
  }: {
    multimedia_id: string;
    segment_id: string;
  }) => {
    return `${API_PATHS.BASE_URL}/multimedia/${multimedia_id}/transcript/segment/${segment_id}/words`;
  },
};

export const ROUTE_PATHS = {
  HOME: "/home",
  CATEGORIAS: "/home/categorias",
  RECIENTES: "/home/recientes",
  FAVORITOS: "/home/favoritos",
};

export const ASIDE_LINKS = [
  {
    href: ROUTE_PATHS.HOME,
    label: "Home",
    icon: <HomeIcon height={15} width={15} />,
  },
  {
    href: ROUTE_PATHS.CATEGORIAS,
    label: "Categorías",
    icon: <CopyIcon height={15} width={15} />,
  },
  {
    href: ROUTE_PATHS.RECIENTES,
    label: "Recientes",
    icon: <TimeIcon height={15} width={15} />,
  },
  {
    href: ROUTE_PATHS.FAVORITOS,
    label: "Favoritos",
    icon: <StarIcon height={15} width={15} />,
  },
];

export const ASIDE_EXPANDED_ROUTES = [
  ROUTE_PATHS.HOME,
  ROUTE_PATHS.CATEGORIAS,
  ROUTE_PATHS.RECIENTES,
  ROUTE_PATHS.FAVORITOS,
];

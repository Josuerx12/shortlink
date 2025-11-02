import { api } from "../lib/api";
import type { BasePagination } from "../types/base-pagination.interface";
import type { Link, LinkInputProps } from "../types/link";

export function useShortLink() {
  const createShortLink = async (props: LinkInputProps): Promise<Link> => {
    const response = await api.post<Link>("/links", props);

    const data = response.data;

    return data;
  };

  const getShortLinkInfo = async (shortCode: string): Promise<Link> => {
    const response = await api.get<Link>(`/links/short/${shortCode}`);

    const data = response.data;

    return data;
  };

  const getShortLinkById = async (id: string): Promise<Link> => {
    const response = await api.get<Link>(`/links/id/${id}`);

    const data = response.data;

    return data;
  };

  const getAllShortLinks = async (): Promise<BasePagination<Link>> => {
    const response = await api.get<BasePagination<Link>>(`/links`);

    const data = response.data;

    return data;
  };

  return {
    createShortLink,
    getShortLinkInfo,
    getShortLinkById,
    getAllShortLinks,
  };
}

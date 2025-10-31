import { api } from "../lib/api";

export function useShortLink() {
  const createShortLink = async (originalUrl: string) => {
    const response = await api.post("/links", { originalUrl });

    const data = response.data;

    return data;
  };

  const getShortLinkInfo = async (shortCode: string) => {
    const response = await api.get(`/links/${shortCode}`);

    const data = response.data;

    return data;
  };

  const getShortLinkById = async (id: string) => {
    const response = await api.get(`/links/id/${id}`);

    const data = response.data;

    return data;
  };

  const getAllShortLinks = async () => {
    const response = await api.get(`/links`);

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

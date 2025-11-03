import { api } from "../lib/api";
import type { DashboardOverview } from "../types/dashboard";

export const useDashboard = () => {
  async function overview(): Promise<DashboardOverview> {
    const res = await api.get<DashboardOverview>("/dashboard/overview");

    return res.data;
  }

  return { overview };
};

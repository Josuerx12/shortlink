import type { Link } from "./link";

export interface DashboardOverview {
  totalLinks: number;
  activeLinks: number;
  expiredLinks: number;
  totalClicks: number;
  clicksToday: number;
  avgClicksPerLink: number;
  topLink: Link;
  lastCreatedLink: Link;
}

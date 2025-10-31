import { createFileRoute, Outlet } from "@tanstack/react-router";
import Menu from "../../components/dashboard/Menu";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <Menu />

      <div className="flex-1 px-2">
        <Outlet />
      </div>
    </div>
  );
}

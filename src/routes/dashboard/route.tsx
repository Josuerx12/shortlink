import { createFileRoute, Outlet } from "@tanstack/react-router";
import Menu from "../../components/dashboard/Menu";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <Menu />

      <div className="flex-1 ml-[70px] p-3 md:p-6">
        <Outlet />
      </div>
    </div>
  );
}

import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import Menu from "../../components/dashboard/Menu";
import { useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="flex">
      <Menu />

      <div className="flex-1 ml-[70px] p-3 md:p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

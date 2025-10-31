import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
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
    <div className="flex w-full">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Painel</h2>
        <p className="text-slate-300">
          Aqui você verá seus links encurtados, estatísticas e configurações.
        </p>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Configurações da Conta</h2>

      <div className="mt-10 text-center font-medium ">
        <p>Em breve você poderá gerenciar suas configurações aqui.</p>
      </div>
    </div>
  );
}

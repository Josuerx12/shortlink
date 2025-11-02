import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/links/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Gerenciar Links</h2>

      <div className="mt-10 text-center font-medium ">
        <p>Em breve você poderá gerenciar seus links aqui.</p>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import Button from "../../../components/Button";
import { Link, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/use-auth";
import { useShortLink } from "../../../hooks/use-short-link";

export const Route = createFileRoute("/dashboard/links/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const { getAllShortLinks } = useShortLink();

  const { isLoading, isRefetching, data, refetch } = useQuery({
    queryKey: ["dashboard-links"],
    queryFn: getAllShortLinks,
    enabled: !!user,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Links</h2>

        <div className="flex gap-4 w-fit">
          <Button className="text-nowrap" variant="primary">
            <div className="flex justify-between gap-4 items-center">
              Criar Novo Link <Link size={16} />
            </div>
          </Button>
          <Button
            onClick={() => refetch()}
            className="text-nowrap"
            variant="secondary"
          >
            <div className="flex justify-between gap-4 items-center">
              Atualizar Dados
              <RefreshCcw
                className={`${isRefetching ? "animate-spin" : ""}`}
                size={16}
              />
            </div>
          </Button>
        </div>
      </div>

      {data && !isRefetching && (
        <div className="overflow-auto shadow shadow-slate-500 bg-slate-900 rounded-lg p-4">
          <table className=" w-full text-sm text-slate-200">
            <thead>
              <tr className="bg-slate-800/80 text-slate-100">
                <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">
                  Link Encurtado
                </th>
                <th className="text-left px-4 py-3 font-semibold">Destino</th>
                <th className="text-left px-4 py-3 font-semibold">Cliques</th>
                <th className="text-center px-4 py-3 font-semibold rounded-tr-lg w-[200px]">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((link) => (
                <tr
                  key={link.shortCode}
                  className="hover:bg-slate-800/60 transition-colors border-t border-slate-700"
                >
                  <td className="px-4 py-3 border border-slate-600 rounded">
                    <span className="truncate block max-w-[180px]">
                      {window.location.origin}/{link.shortCode}
                    </span>
                  </td>
                  <td className="px-4 py-3 border border-slate-600 rounded">
                    <span className="truncate block max-w-[250px]">
                      {link.originalUrl}
                    </span>
                  </td>
                  <td className="px-4 py-3 border border-slate-600 rounded text-cyan-400 font-medium">
                    {link.visitsCount ?? "Nenhum dado encontrado."}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2 flex-wrap lg:flex-nowrap">
                      <Button
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md w-full"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md w-full"
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(isLoading || isRefetching) && (
        <div className="flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 mb-6 border-cyan-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <p>Carregando dados do painel...</p>
        </div>
      )}
    </div>
  );
}

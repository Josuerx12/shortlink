import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../../hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDashboard } from "../../hooks/use-dashboard";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CalendarDays,
  ChartBar,
  History,
  Link2,
  MousePointerClick,
  RefreshCcw,
  Trophy,
} from "lucide-react";
import Card from "../../components/card/Card";
import CardHeader from "../../components/card/CardHeader";
import CardBody from "../../components/card/CardBody";
import CardIcon from "../../components/card/CardIcon";
import Button from "../../components/Button";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading } = useAuth();

  const { overview } = useDashboard();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, isLoading, navigate]);

  const {
    data,
    isLoading: isOverviewLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: overview,
    enabled: !!user,
  });

  return (
    <div className="flex w-full">
      <div className="flex-1">
        <div className="flex justify-between flex-wrap">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Painel</h2>

          <Button
            variant="secondary"
            className="w-fit! h-fit!"
            onClick={() => refetch()}
          >
            <div className="flex items-center justify-between gap-2 text-[16px]!">
              Atualizar Dados
              <RefreshCcw
                className={`${isRefetching ? "animate-spin" : ""}`}
                size={16}
              />
            </div>
          </Button>
        </div>

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Card>
              <div>
                <CardHeader>Links Totais</CardHeader>

                <CardBody>{data.totalLinks}</CardBody>
              </div>

              <CardIcon>
                <Link2 className="w-6 h-6 text-blue-400" />
              </CardIcon>
            </Card>

            <Card>
              <div>
                <CardHeader>Links Ativos</CardHeader>

                <CardBody>{data.activeLinks}</CardBody>
              </div>

              <CardIcon>
                <Activity className="w-6 h-6 text-green-400" />
              </CardIcon>
            </Card>

            <Card>
              <div>
                <CardHeader>Cliques Totais</CardHeader>

                <CardBody>{data.totalClicks}</CardBody>
              </div>

              <CardIcon>
                <MousePointerClick className="w-6 h-6 text-yellow-400" />
              </CardIcon>
            </Card>

            <Card>
              <div>
                <CardHeader>Cliques Hoje</CardHeader>

                <CardBody>{data.clicksToday}</CardBody>
              </div>

              <CardIcon>
                <CalendarDays className="w-6 h-6 text-pink-400" />
              </CardIcon>
            </Card>

            <Card>
              <div>
                <CardHeader>Média de Cliques por Link</CardHeader>

                <CardBody>{data.avgClicksPerLink}</CardBody>
              </div>

              <CardIcon>
                <ChartBar className="w-6 h-6 text-pink-400" />
              </CardIcon>
            </Card>

            <Card>
              <div>
                <CardHeader>Links Expirados</CardHeader>

                <CardBody>{data.expiredLinks}</CardBody>
              </div>

              <CardIcon>
                <ChartBar className="w-6 h-6 text-pink-400" />
              </CardIcon>
            </Card>
          </div>
        )}

        {data && (
          <div className="grid md:grid-cols-2 gap-4 mt-4 md:mt-10">
            <div className="bg-slate-800  p-4 rounded-lg shadow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Top Link</h3>
                <Trophy className="text-yellow-400" />
              </div>

              <div className="flex flex-col gap-y-1.5">
                <p className="text-sm text-slate-300">
                  <b>Link Original: </b>
                  <Link
                    className="text-cyan-400"
                    to={data.topLink.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.topLink.originalUrl}
                  </Link>
                </p>
                <p className="text-sm text-slate-300">
                  <b>Link Encurtado: </b>
                  <Link
                    className="text-cyan-400"
                    to={window.location.origin + "/" + data.topLink.shortCode}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {window.location.origin + "/" + data.topLink.shortCode}
                  </Link>
                </p>

                <p className="text-sm text-slate-300">
                  <b>Total de Visitas: </b> {data.topLink.visitsCount}
                </p>
              </div>
            </div>

            <div className="bg-slate-800  p-4 rounded-lg shadow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Ultimo Link Encurtado</h3>
                <History className="text-cyan-400" />
              </div>

              <div className="flex flex-col gap-y-1.5">
                <p className="text-sm text-slate-300">
                  <b>Link Original: </b>
                  <Link
                    className="text-cyan-400"
                    to={data.lastCreatedLink.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.lastCreatedLink.originalUrl}
                  </Link>
                </p>
                <p className="text-sm text-slate-300">
                  <b>Link Encurtado: </b>
                  <Link
                    className="text-cyan-400"
                    to={
                      window.location.origin +
                      "/" +
                      data.lastCreatedLink.shortCode
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {window.location.origin +
                      "/" +
                      data.lastCreatedLink.shortCode}
                  </Link>
                </p>

                <p className="text-sm text-slate-300">
                  <b>Total de Visitas: </b> {data.lastCreatedLink.visitsCount}
                </p>
              </div>
            </div>
          </div>
        )}

        {isOverviewLoading && (
          <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            <p>Carregando dados do painel...</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useShortLink } from "../hooks/use-short-link";
import LogoMarca from "../components/logo/LogoMarca";

export const Route = createFileRoute("/$shortlink")({
  component: RouteComponent,
});

function RouteComponent() {
  const { shortlink } = useParams({ from: "/$shortlink" });
  const { getShortLinkInfo } = useShortLink();
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    if (counter <= 0) return;

    const timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const { isSuccess, data, isError } = useQuery({
    queryKey: ["fetchShortlink", shortlink],
    queryFn: () => getShortLinkInfo(shortlink),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      window.location.href = data.originalUrl;
    }
  }, [isSuccess, data]);

  return (
    <div className="w-full min-h-full bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-800 fixed flex flex-col items-center">
      <div className="mx-auto bg-slate-500 p-2 rounded-md mt-20 mb-6">
        <LogoMarca />
      </div>
      <h1 className="text-3xl font-bold mb-4">Redirecionando...</h1>
      {counter > 0 && isSuccess && (
        <p className="text-slate-400 mb-6">
          Você será redirecionado em {counter} segundo{counter !== 1 ? "s" : ""}
          .
        </p>
      )}

      {counter === 0 && isSuccess && <p>Redirecionando...</p>}

      {isError && (
        <p className="text-red-500 mb-6">
          Link inválido ou expirado. Verifique o link e tente novamente.
        </p>
      )}

      {isSuccess && (
        <a
          href={`/api/short-links/${shortlink}`}
          className="text-blue-500 underline"
        >
          Redirecionar agora
        </a>
      )}

      <Link to="/" className="text-cyan-500 hover:underline mt-10">
        Voltar para a pagina inicial
      </Link>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { useShortLink } from "../hooks/use-short-link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSchema, type LinkInputProps } from "../types/link";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user } = useAuth();

  const { createShortLink } = useShortLink();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LinkSchema),
  });

  const [copied, setCopied] = useState(false);

  const { data, mutate, isSuccess } = useMutation({
    mutationFn: createShortLink,
    mutationKey: ["createShortLink"],
  });

  const shortedLink = `${import.meta.env.VITE_APP_ENV === "development" ? "http://localhost:5173" : "https://encurta.jcdev.com.br"}/${data?.shortCode}`;

  console.log(data, isSuccess);

  const handleCopy = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(shortedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const onSubmit = (data: LinkInputProps) => {
    mutate(data);
  };

  return (
    <main className="h-full flex flex-col items-center justify-start ">
      <section className="w-full max-w-4xl px-6 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Encurta <span className="text-cyan-300">by JCDev</span>
        </h1>
        <p className="text-slate-300 mb-8">
          Encurte links rapidamente e compartilhe com segurança. Simples, rápido
          e confiável.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-3"
        >
          <label htmlFor="url" className="sr-only">
            URL para encurtar
          </label>

          <div className="flex flex-col flex-1 relative">
            <input
              {...register("originalUrl")}
              id="url"
              type="url"
              placeholder="Cole sua URL aqui (ex: https://example.com)"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-4 py-3 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            />
            {errors.originalUrl && (
              <p className="text-sm text-red-500 absolute -bottom-6 left-1">
                {errors.originalUrl.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md cursor-pointer bg-cyan-500 text-slate-900 px-4 py-3 font-medium hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Encurtar
            </button>
            {!user && (
              <Link
                to="/register"
                className="hidden sm:inline-flex items-center rounded-md bg-slate-700 text-slate-100 px-4 py-3 hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Criar conta
              </Link>
            )}
          </div>
        </form>

        {isSuccess && (
          <div className="mt-6 mx-auto max-w-2xl bg-slate-800 border border-slate-700 rounded-md p-3 flex items-center justify-between gap-3">
            <a
              href={shortedLink}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-200 truncate"
            >
              {shortedLink}
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="rounded-md bg-slate-700 text-slate-100 px-3 py-1 hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>

            {!user && (
              <p>
                Link encurtado por 24 horas, faça login para gerar url's
                encurtadas permanente.
              </p>
            )}
          </div>
        )}
      </section>

      <section className="w-full max-w-4xl px-6 py-8">
        <h2 className="text-xl font-semibold mb-4">Por que usar o Encurta?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-md p-4">
            <h3 className="font-semibold text-cyan-300">Rápido</h3>
            <p className="text-slate-300 text-sm mt-2">
              Encurte URLs em segundos com uma interface limpa.
            </p>
          </div>
          <div className="bg-slate-800 rounded-md p-4">
            <h3 className="font-semibold text-cyan-300">Seguro</h3>
            <p className="text-slate-300 text-sm mt-2">
              Links gerados são fáceis de compartilhar e gerenciar.
            </p>
          </div>
          <div className="bg-slate-800 rounded-md p-4">
            <h3 className="font-semibold text-cyan-300">Simples</h3>
            <p className="text-slate-300 text-sm mt-2">
              Design minimal e foco em usabilidade para seu dia a dia.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

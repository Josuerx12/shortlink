import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [input, setInput] = useState("");
  const [short, setShort] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    const hash = Math.random().toString(36).substring(2, 8);
    const result = `${window.location.origin}/${hash}`;
    setShort(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!short) return;
    try {
      await navigator.clipboard.writeText(short);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
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
          onSubmit={handleShorten}
          className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-3"
        >
          <label htmlFor="url" className="sr-only">
            URL para encurtar
          </label>
          <input
            id="url"
            type="url"
            placeholder="Cole sua URL aqui (ex: https://example.com)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-md bg-slate-800 border border-slate-700 px-4 py-3 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-cyan-500 text-slate-900 px-4 py-3 font-medium hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Encurtar
            </button>
            <Link
              to="/register"
              className="hidden sm:inline-flex items-center rounded-md bg-slate-700 text-slate-100 px-4 py-3 hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Criar conta
            </Link>
          </div>
        </form>

        {short && (
          <div className="mt-6 mx-auto max-w-2xl bg-slate-800 border border-slate-700 rounded-md p-3 flex items-center justify-between gap-3">
            <a
              href={short}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-200 truncate"
            >
              {short}
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="rounded-md bg-slate-700 text-slate-100 px-3 py-1 hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>

            <p>
              Link encurtado por 24 horas, faça login para gerar url's
              encurtadas permanente.
            </p>
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

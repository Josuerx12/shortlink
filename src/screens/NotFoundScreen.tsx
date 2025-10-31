import { Link } from "@tanstack/react-router";
import { Home, TriangleAlert } from "lucide-react";

const NotFoundScreen = () => {
  return (
    <div className="w-full flex flex-col text-slate-100">
      <header className="text-center mt-20 mb-10">
        <TriangleAlert className="mx-auto mb-6 w-16 h-16 text-yellow-500" />
        <h1 className="text-3xl font-bold mb-4">Página Não Encontrada</h1>
        <p className="text-slate-400">
          Desculpe, a página que você está procurando não existe.
        </p>

        <Link to="/" className="text-cyan-500 hover:underline mt-10">
          Voltar para a pagina inicial <Home />
        </Link>
      </header>
    </div>
  );
};

export default NotFoundScreen;

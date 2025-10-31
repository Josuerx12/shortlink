import { Logo } from "./LogoLink";

const LogoMarca = () => {
  return (
    <div className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded">
      <span className="sr-only">Encurta - Ir para página inicial</span>
      <Logo />
      <h1 className="font-semibold text-slate-100 text-sm sm:text-base">
        Encurta <span className="text-cyan-300">By JCDEV</span>
      </h1>
    </div>
  );
};

export default LogoMarca;

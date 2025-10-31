import { Link } from "@tanstack/react-router";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <rect width="24" height="24" rx="5" fill="#0F172A" />
    <path
      d="M9.5 14.5a3 3 0 004.24 0l2.26-2.26a3 3 0 10-4.24-4.24L11.5 9"
      stroke="#06B6D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 9.5a3 3 0 00-4.24 0L8 11.76a3 3 0 104.24 4.24L13.5 14"
      stroke="#06B6D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar = () => {
  return (
    <header className="w-full h-14 px-4 text-slate-100 flex items-center justify-between  font-sans">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded"
        >
          <span className="sr-only">Encurta - Ir para página inicial</span>
          <Logo />
          <h1 className="font-semibold text-slate-100 text-sm sm:text-base">
            Encurta <span className="text-cyan-300">By JCDEV</span>
          </h1>
        </Link>
      </div>

      <nav className="flex gap-4 items-center">
        {/* <Link
          to={"/"}
          className="text-slate-200 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 [&.active]:text-cyan-300 px-2 py-1"
        >
          Página Inicial
        </Link> */}

        <Link
          to={"/dashboard"}
          className="text-slate-200 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 [&.active]:text-cyan-300 px-2 py-1"
        >
          Dashboard
        </Link>

        <Link
          to={"/auth/login"}
          className="hidden sm:inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1 text-slate-200 [&.active]:border-cyan-400 hover:border-cyan-400 [&.active]:text-cyan-300 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Login
        </Link>

        <Link
          to={"/auth/register"}
          className="inline-flex items-center gap-2 rounded-md bg-cyan-500 text-slate-900 px-3 py-1 [&.active]:bg-cyan-400 hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Registrar-se
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

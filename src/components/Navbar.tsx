import { Link, redirect } from "@tanstack/react-router";
import LogoLink from "./logo/LogoLink";
import { useAuth } from "../hooks/use-auth";
import Button from "./Button";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full h-14 px-4 text-slate-100 flex items-center justify-between  font-sans">
      <div className="flex items-center gap-4">
        <LogoLink />
      </div>

      <nav className="flex gap-4 items-center">
        {user && (
          <Link
            to={"/dashboard"}
            className="text-slate-200 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 [&.active]:text-cyan-300 px-2 py-1"
          >
            Dashboard
          </Link>
        )}

        {user ? (
          <Button
            onClick={() => {
              logout();
              redirect({ to: "/" });
            }}
            variant="danger"
          >
            Sair
          </Button>
        ) : (
          <>
            <Link
              to={"/login"}
              className="sm:inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1 text-slate-200 [&.active]:border-cyan-400 hover:border-cyan-400 [&.active]:text-cyan-300 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Login
            </Link>

            <Link
              to={"/register"}
              className="inline-flex items-center gap-2 rounded-md bg-cyan-500 text-slate-900 px-3 py-1 [&.active]:bg-cyan-400 hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Registrar-se
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

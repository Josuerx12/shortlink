import { Link } from "@tanstack/react-router";
export const Logo = () => (
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

const LogoLink = () => {
  return (
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
  );
};

export default LogoLink;

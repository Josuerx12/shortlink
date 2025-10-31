import { useState } from "react";
import {
  Home,
  Link as LinkIcon,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React from "react";

type Item = {
  label: string;
  to?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

const Menu = () => {
  const [open, setOpen] = useState(true);

  const items: Item[] = [
    { label: "Visão Geral", to: "/dashboard", icon: Home },
    { label: "Meus Links", to: "/dashboard/links", icon: LinkIcon },
    { label: "Analytics", to: "/dashboard/analytics", icon: BarChart2 },
    { label: "Configurações", to: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={`shrink-0 border-r rounded border-r-slate-500 min-h-screen h-full transition-all duration-200 ${
        open ? "w-64" : "w-16"
      }`}
      aria-label="Menu lateral do dashboard"
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-500 text-slate-900 rounded-md w-8 h-8 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12h18"
                    stroke="#07132A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {open && <span className="font-semibold">Painel</span>}
            </div>

            <button
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="p-1 rounded-full cursor-pointer hover:bg-slate-800"
              title={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>

          <nav className="mt-4 px-2 flex flex-col gap-1">
            {items.map((it) => {
              const Icon = it.icon;
              const content = (
                <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800">
                  <Icon className="text-cyan-300" />
                  {open && <span className="text-sm">{it.label}</span>}
                </div>
              );

              if (it.to) {
                return (
                  <a
                    key={it.label}
                    href={it.to}
                    className="block text-slate-200"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <button
                  key={it.label}
                  onClick={it.onClick}
                  className="w-full text-left text-slate-200"
                >
                  {content}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-3 py-4 text-xs text-slate-500">
          Versão 0.1 • JCDev
        </div>
      </div>
    </aside>
  );
};

export default Menu;

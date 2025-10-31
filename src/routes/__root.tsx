import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const RootLayout = () => {
  return (
    <main className="min-h-screen flex flex-col bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-800 text-slate-100">
      <Navbar />

      <Outlet />

      <Footer />
      <TanStackRouterDevtools />
    </main>
  );
};

export const Route = createRootRoute({ component: RootLayout });

import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import LoadingScreen from "../screens/LoadingScreen";
import { useAuth } from "../hooks/use-auth";
import { ToastContainer } from "react-toastify";
import NotFoundScreen from "../screens/NotFoundScreen";

const RootLayout = () => {
  const { isLoading } = useAuth();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  const isShortlinkPath =
    /^\/[A-Za-z0-9_-]{4,}$/.test(pathname) &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/api");

  if (isLoading && !isShortlinkPath) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen flex flex-col bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-800 text-slate-100">
      <Navbar />

      <div className="pt-14">
        <Outlet />
      </div>

      <Footer />
      <ToastContainer />
      <TanStackRouterDevtools />
    </main>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundScreen,
});

import Footer from "../components/footer";
import LogoMarca from "../components/logo/LogoMarca";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-800 text-slate-100">
      <header className="text-center mt-20 mb-10">
        <div className="mx-auto w-fit mb-6">
          <LogoMarca />
        </div>
        <div className="flex justify-center items-center my-10">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>

        <h1 className="text-3xl font-bold mb-4 min-w-sm w-full flex items-center justify-center gap-3">
          <span>Carregando...</span>
        </h1>

        <p className="text-slate-400">
          Por favor, aguarde enquanto coletamos suas informações.
        </p>
      </header>

      <Footer />
    </div>
  );
};

export default LoadingScreen;

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import LogoMarca from "../../../components/logo/LogoMarca";
import Button from "../../../components/Button";
import InputPassword from "../../../components/InputPassword";
import { useAuth } from "../../../hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInputProps } from "../../../types/auth";
import type { AxiosErrorResponse } from "../../../types/axios.error";
import { useEffect } from "react";
import Input from "../../../components/Input";
import { LoaderCircle } from "lucide-react";

export const Route = createFileRoute("/_auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login, user, isLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, isLoading, navigate]);

  const { mutate, error, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess() {
      navigate({ to: "/dashboard" });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginInputProps) {
    mutate(data);
  }

  const responseError = (error as unknown as AxiosErrorResponse)?.response?.data
    ?.message as string;

  return (
    <div className="p-6 border  border-slate-700 rounded-lg shadow-2xl shadow-slate-800 max-w-sm w-full mx-auto my-auto">
      <div className="">
        <LogoMarca />

        <h2 className="text-2xl font-bold mt-6 mb-2 text-slate-100">
          Faça Login
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Acesse sua conta para gerenciar seus links encurtados.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto flex flex-col gap-4"
      >
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <Input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Coloque seu email"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <InputPassword
            {...register("password")}
            id="password"
            placeholder="Coloque sua senha"
          />

          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {responseError && (
          <p className="bg-red-500 text-white p-2 rounded text-sm text-start">
            <b>Error: </b>
            {responseError}
          </p>
        )}

        <p className="text-sm">
          Esqueceu sua senha? <br />
          <Link to="/forgot-password" className="text-cyan-300 hover:underline">
            Clique aqui
          </Link>
        </p>

        <p className="text-sm">
          Não possui uma conta? <br />
          <Link to="/register" className="text-cyan-300 hover:underline">
            Crie uma agora!
          </Link>
        </p>

        <Button type="submit">
          {" "}
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <span>Autenticado</span> <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <>Autenticar-se</>
          )}
        </Button>
      </form>
    </div>
  );
}

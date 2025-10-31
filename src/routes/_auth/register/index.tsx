import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../../hooks/use-auth";
import { useEffect } from "react";
import Button from "../../../components/Button";
import LogoMarca from "../../../components/logo/LogoMarca";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInputProps } from "../../../types/auth";
import Input from "../../../components/Input";
import InputPassword from "../../../components/InputPassword";
import { useMutation } from "@tanstack/react-query";
import type { AxiosRegisterUserErrorResponse } from "../../../types/axios.error";
import { LoaderCircle } from "lucide-react";

export const Route = createFileRoute("/_auth/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading, register: registerUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, isLoading, navigate]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
    onSuccess() {
      navigate({ to: "/dashboard" });
    },
  });

  const responseError = (error as unknown as AxiosRegisterUserErrorResponse)
    ?.response?.data;

  function onSubmit(data: RegisterInputProps) {
    mutate(data);
  }

  return (
    <div className="p-6 border  border-slate-700 rounded-lg shadow-2xl shadow-slate-800 max-w-sm w-full mx-auto my-auto">
      <div>
        <LogoMarca />

        <h2 className="text-2xl font-bold mt-6 mb-2 text-slate-100">
          Crie sua conta
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Junte-se a nós e comece a gerenciar seus links encurtados hoje mesmo!
        </p>
      </div>
      <form
        className="max-w-md mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Nome
          </label>
          <Input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Seu nome completo"
          />

          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}

          {responseError?.errors?.name && (
            <p className="text-red-500 mt-1 text-sm">
              {responseError?.errors?.name[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Email
          </label>
          <Input
            {...register("email")}
            type="text"
            id="email"
            placeholder="Seu email"
          />

          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}

          {responseError?.errors?.email && (
            <p className="text-red-500 mt-1 text-sm">
              {responseError?.errors?.email[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Senha
          </label>
          <InputPassword
            {...register("password")}
            id="password"
            placeholder="Sua senha"
          />

          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}

          {responseError?.errors?.password && (
            <p className="text-red-500 mt-1 text-sm">
              {responseError?.errors?.password[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password_confirmation"
            className="block mb-1 font-medium"
          >
            Confirme sua senha
          </label>
          <InputPassword
            {...register("password_confirmation")}
            id="password_confirmation"
            placeholder="Sua senha"
          />

          {errors.password_confirmation && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password_confirmation.message}
            </p>
          )}

          {responseError?.errors?.password_confirmation && (
            <p className="text-red-500 mt-1 text-sm">
              {responseError?.errors?.password_confirmation[0]}
            </p>
          )}
        </div>

        <p className="text-sm">
          Já possui uma conta?{" "}
          <Link to="/login" className="text-cyan-400">
            Faça login
          </Link>
        </p>

        <Button disabled={isPending} type="submit">
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <span>Cadastrando</span> <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <>Cadastrar</>
          )}
        </Button>
      </form>
    </div>
  );
}

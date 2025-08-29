import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { loginApi, LoginResponseDto } from "../services/auth.service";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthLogin } from "@/models/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function useLogin() {
  const mutation = useMutation<LoginResponseDto, Error, AuthLogin>({
    mutationFn: loginApi,
  });

  return {
    login: mutation.mutateAsync, // devuelve Promise<LoginResponseDto>
    ...mutation, // opcional: expone isLoading, isError, etc.
  };
}

/* 


export const useLogin = (request: AuthLogin|null): UseQueryResult<LoginResponseDto, Error> => {
  return useQuery<LoginResponseDto, Error>({
    queryKey: ['login', request],
    queryFn: () => loginApi(request!),
    retry: 0,
    enabled: !!request, // Solo habilita la consulta si request no es null
  });
} */
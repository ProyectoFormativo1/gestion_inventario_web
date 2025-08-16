// useUsuario.ts

import { createUsuarioApi, deleteUsuarioApi, findAllUsuariosApi, updateUsuarioApi } from "@/services/usuario.service";
import { Usuario } from "@/types/usuario";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUsuario() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Usuario[]>({
    queryKey: ["usuarios"],
    queryFn: findAllUsuariosApi,
    select: (data) =>
      data.map((usuario) => ({
        ...usuario,
        key: usuario.id, // agregamos la key ara el datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createUsuarioApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateUsuarioApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteUsuarioApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createUsuario: createMutation.mutate,
    updateUsuario: updateMutation.mutate,
    deleteUsuario: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}
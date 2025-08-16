// useambientes.ts

import { createAmbientesApi, deleteAmbientesApi, findAllambientesApi, updateAmbientesApi } from "@/services/ambientes.service";
import { Ambientes } from "@/types/ambientes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useambientes() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Ambientes[]>({
    queryKey: ["ambientes"],
    queryFn: findAllambientesApi,
    select: (data) =>
      data.map((ambiente) => ({
        ...ambiente,
        key: ambiente.id, // agregamos la key ara el datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createAmbientesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambientes"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateAmbientesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambientes"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteAmbientesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambientes"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createAmbientes: createMutation.mutate,
    updateAmbientes: updateMutation.mutate,
    deleteAmbientes: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}
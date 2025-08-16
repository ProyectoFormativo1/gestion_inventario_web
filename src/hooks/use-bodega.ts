// useCentrosFormacion.ts

import { createBodegaApi, deleteBodegaApi, findAllbodegaApi, updateBodegaApi } from "@/services/bodega.service";
import { Bodega } from "@/types/bodega";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useBodegas() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Bodega[]>({
    queryKey: ["centrosFormacion"],
    queryFn: findAllbodegaApi,
    select: (data) =>
      data.map((centro) => ({
        ...centro,
        key: centro.id, // agregamos la key ara el datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createBodegaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrosFormacion"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateBodegaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrosFormacion"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteBodegaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrosFormacion"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createBodega: createMutation.mutate,
    updateBodega: updateMutation.mutate,
    deleteBodega: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}
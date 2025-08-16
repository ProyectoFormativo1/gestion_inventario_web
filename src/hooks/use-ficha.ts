import {
  createFichaApi,
  deleteFichaApi,
  findAllFichasApi,
  updateFichaApi,
} from "@/services/fichas.service";
import { Ficha } from "@/types/ficha";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useFichas() {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<Ficha[]>({
    queryKey: ["fichas"],
    queryFn: findAllFichasApi,
    select: (data) =>
      data.map((ficha) => ({
        ...ficha,
        key: ficha.id, // key para datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createFichaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fichas"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateFichaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fichas"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteFichaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fichas"] }),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createFicha: createMutation.mutate,
    updateFicha: updateMutation.mutate,
    deleteFicha: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

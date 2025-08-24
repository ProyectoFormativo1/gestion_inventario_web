// usebodega.ts

import {
  createBodegaApi,
  deleteBodegaApi,
  findAllBodegasBySedeApi,
  updateBodegaApi,
} from "@/services/bodega.service";
import { Bodega } from "@/types/bodega";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export function useBodegasBySede(sedeId?: number | null) {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Bodega[]>({
    queryKey: ["bodegasBySede", sedeId],
    queryFn: ({ queryKey }) => {
      const [, sedeId] = queryKey;
      return findAllBodegasBySedeApi(sedeId as number);
    },
    enabled: !!sedeId,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export function useBodegas(sedeId?: number | null) {
  const queryClient = useQueryClient();

  // CREATE
  const createMutation = useMutation({
    mutationFn: createBodegaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bodega"] });
      if (sedeId) {
        queryClient.invalidateQueries({ queryKey: ["bodegasBySede", sedeId] });
      }
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateBodegaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bodega"] });
      if (sedeId) {
        queryClient.invalidateQueries({ queryKey: ["bodegasBySede", sedeId] });
      }
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteBodegaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bodega"] });
      if (sedeId) {
        queryClient.invalidateQueries({ queryKey: ["bodegasBySede", sedeId] });
      }
    },
  });

  return {
    createBodega: createMutation.mutate,
    updateBodega: updateMutation.mutate,
    deleteBodega: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

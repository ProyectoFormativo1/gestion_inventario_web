import {
  createUnidadMedidaApi,
  deleteUnidadMedidaApi,
  findAllUnidadesMedidaApi,
  updateUnidadMedidaApi,
} from "@/services/unidad-medida.service";
import { UnidadMedida } from "@/types/unidad-medida";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUnidadMedida() {
  const queryClient = useQueryClient();

  // GET
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<UnidadMedida[]>({
    queryKey: ["unidades-medida"],
    queryFn: findAllUnidadesMedidaApi,
    select: (data) =>
      data.map((unidad) => ({
        ...unidad,
        key: unidad.id, // key para DataTable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createUnidadMedidaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unidades-medida"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateUnidadMedidaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unidades-medida"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteUnidadMedidaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unidades-medida"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createUnidadMedida: createMutation.mutate,
    updateUnidadMedida: updateMutation.mutate,
    deleteUnidadMedida: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

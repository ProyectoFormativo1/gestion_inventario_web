import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Movimiento } from "@/types/movimiento";
import { createMovimientoApi, deleteMovimientoApi, findAllMovimientoApi } from "@/services/movimiento.service";

export function useMovimiento() {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<Movimiento[]>({
    queryKey: ["movimientos"],
    queryFn: findAllMovimientoApi,
    select: (data) =>
      data.map((movimiento) => ({
        ...movimiento,
        key: movimiento.id,
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createMovimientoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimientos"] });
    },
  });


  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteMovimientoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimientos"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createMovimiento: createMutation.mutate,
    deleteMovimiento: deleteMutation.mutate,
    createStatus: createMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

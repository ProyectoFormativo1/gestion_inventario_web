import { useQuery } from "@tanstack/react-query";
import { findAllTipoMovimientoApi } from "@/services/tipo-movimiento.service";
import { TipoMovimiento } from "@/types/tipo-movimiento";

export function useTipoMovimiento() {

  // GET
  const { data, isLoading, isError, refetch } = useQuery<TipoMovimiento[]>({
    queryKey: ["tipo-movimientos"],
    queryFn: findAllTipoMovimientoApi,
    select: (data) =>
      data.map((movimiento) => ({
        ...movimiento,
        key: movimiento.id,
      })),
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
}

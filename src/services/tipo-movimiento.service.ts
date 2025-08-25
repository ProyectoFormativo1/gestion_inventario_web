import { TipoMovimiento } from "@/types/tipo-movimiento";
import { apiClient } from "@/utils/api-client.util";
// Obtener movimientos
export const findAllTipoMovimientoApi = async (): Promise<TipoMovimiento[]> => {
  return apiClient("/tipo-movimiento", { method: "GET" });
};




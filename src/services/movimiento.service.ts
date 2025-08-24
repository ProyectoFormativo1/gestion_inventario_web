import { Movimiento, SaveMovimiento } from "@/types/movimiento";
import { apiClient } from "@/utils/api-client.util";


// Obtener movimientos
export const findAllMovimientoApi = async (): Promise<Movimiento[]> => {
  return apiClient("/movimientos", { method: "GET" });
};

// Crear movimiento
export const createMovimientoApi = async (request: SaveMovimiento): Promise<Movimiento> => {
  return apiClient("/movimientos", { method: "POST", body: JSON.stringify(request) });
};

// Actualizar movimiento
export const updateMovimientoApi = async (request: SaveMovimiento): Promise<Movimiento> => {
  if (!request.id) throw new Error("ID requerido para actualizar movimiento");
  return apiClient(`/movimientos/${request.id}`, { method: "PUT", body: JSON.stringify(request) });
};

// Eliminar movimiento
export const deleteMovimientoApi = async (id: number): Promise<void> => {
  return apiClient(`/movimientos/${id}`, { method: "DELETE" });
};
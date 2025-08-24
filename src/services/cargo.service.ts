import { Cargo, SaveCargo } from "@/types/cargo";
import { apiClient } from "@/utils/api-client.util";


// Obtener cargos
export const findAllCargoApi = async (): Promise<Cargo[]> => {
  return apiClient("/cargo", { method: "GET" });
};

// Crear cargo
export const createCargoApi = async (request: SaveCargo): Promise<Cargo> => {
  return apiClient("/cargo", { method: "POST", body: JSON.stringify(request) });
};

// Actualizar cargo
export const updateCargoApi = async (request: SaveCargo): Promise<Cargo> => {
  if (!request.id) throw new Error("ID requerido para actualizar cargo");
  return apiClient(`/cargo/${request.id}`, { method: "PATCH", body: JSON.stringify(request) });
};

// Eliminar cargo
export const deleteCargoApi = async (id: number): Promise<void> => {
  return apiClient(`/cargo/${id}`, { method: "DELETE" });
};
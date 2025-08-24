import { Ficha, SaveFicha } from "@/types/ficha";
import { apiClient } from "@/utils/api-client.util";

// Obtener todas las fichas
export const findAllFichasApi = async (): Promise<Ficha[]> => {
  return apiClient("/fichas", { method: "GET" });
};

// Crear ficha
export const createFichaApi = async (request: SaveFicha): Promise<Ficha> => {
  return apiClient("/fichas", { method: "POST", body: JSON.stringify(request), });
};
// Actualizar ficha
export const updateFichaApi = async (request: SaveFicha): Promise<Ficha> => {
  if (!request.id) throw new Error("ID requerido para actualizar ficha");
  return apiClient(`/fichas/${request.id}`, { method: "PATCH", body: JSON.stringify(request) });
};

// Eliminar ficha
export const deleteFichaApi = async (id: number): Promise<void> => {
  return apiClient(`/fichas/${id}`, { method: "DELETE" });
};
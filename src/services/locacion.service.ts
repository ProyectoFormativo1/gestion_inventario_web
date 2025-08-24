import { Locacion, SaveCiudad } from "@/types/locacion";
import { apiClient } from "@/utils/api-client.util";

// Obtener todas las locacion
export const findAllLocacionesApi = async (): Promise<Locacion[]> => {
  return apiClient("/locacion", { method: "GET" });
};

// Crear ciudad
export const createLocacionApi = async (request: SaveCiudad): Promise<Locacion> => {
  return apiClient("/locacion", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

// Actualizar ciudad
export const updateLocacionApi = async (request: SaveCiudad): Promise<Locacion> => {
  if (!request.id) throw new Error("ID requerido para actualizar locacion");
  return apiClient(`/locacion/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

// Eliminar locacion
export const deleteLocacionApi = async (id: number): Promise<void> => {
  return apiClient(`/locacion/${id}`, {
    method: "DELETE",
  });
};

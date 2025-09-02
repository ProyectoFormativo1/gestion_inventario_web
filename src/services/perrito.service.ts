import { Perrito, SavePerrito } from "@/types/perrito";
import { apiClient } from "@/utils/api-client.util";

// Obtener todos los perrito
export const findAllPerritoApi = async (): Promise<Perrito[]> => {
  return apiClient("/perrito", { method: "GET" });
};

// Crear perrito
export const createPerritoApi = async (request: SavePerrito): Promise<Perrito> => {
  return apiClient("/perrito", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

// Actualizar perrito
export const updatePerritoApi = async (request: SavePerrito): Promise<Perrito> => {
  if (!request.id) throw new Error("ID requerido para actualizar perrito");
  return apiClient(`/perrito/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

// Eliminar perrito
export const deletePerritoApi = async (id: number): Promise<void> => {
  return apiClient(`/perrito/${id}`, {
    method: "DELETE",
  });
};

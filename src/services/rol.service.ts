import { Rol, SaveRol } from "@/types/rol";
import { apiClient } from "@/utils/api-client.util";

// Obtener roles
export const findAllRolApi = async (): Promise<Rol[]> => {
  return apiClient("/roles", { method: "GET" });
};

// Crear rol
export const createRolApi = async (request: SaveRol): Promise<Rol> => {
  return apiClient("/roles", { method: "POST", body: JSON.stringify(request) });
};


// Actualizar rol
export const updateRolApi = async (request: SaveRol): Promise<Rol> => {
  if (!request.id) throw new Error("ID requerido para actualizar rol");
  return apiClient(`/roles/${request.id}`, { method: "PUT", body: JSON.stringify(request) });
};

// Eliminar rol
export const deleteRolApi = async (id: number): Promise<void> => {
  return apiClient(`/roles/${id}`, { method: "DELETE" });
};
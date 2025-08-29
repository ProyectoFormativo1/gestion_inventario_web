import { PermisosResponse, RolPermiso, SaveRolPermiso } from "@/types/permiso-rol";
import { Rol, SaveRol } from "@/types/rol";
import { apiClient } from "@/utils/api-client.util";

// Obtener roles
export const findAllRolApi = async (): Promise<Rol[]> => {
  return apiClient("/roles", { method: "GET" });
};

export const findAllPermisosByRolApi = async (rolId: number): Promise<PermisosResponse> => {
  return apiClient(`/rol-permisos/rol/${rolId}`, { method: "GET" });
};
// Crear rol
export const createRolApi = async (request: SaveRol): Promise<Rol> => {
  return apiClient("/roles", { method: "POST", body: JSON.stringify(request) });
};

export const createRolPermisoApi = async (request: SaveRolPermiso): Promise<RolPermiso> => {
  return apiClient("/rol-permisos", { method: "POST", body: JSON.stringify(request) });
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

export const deleteRolPermisoApi = async (rolId: number, permisoId: number): Promise<void> => {
  return apiClient(`/rol-permisos/${rolId}/${permisoId}`, { method: "DELETE" });
};
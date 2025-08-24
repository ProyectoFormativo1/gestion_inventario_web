import { Usuario, SaveUsuario } from "@/types/usuario";
import { apiClient } from "@/utils/api-client.util";

// Obtener todos los usuarios
export const findAllUsuariosApi = async (): Promise<Usuario[]> => {
  return apiClient("/usuarios", { method: "GET" });
};

// Crear usuario
export const createUsuarioApi = async (request: SaveUsuario): Promise<Usuario> => {
  return apiClient("/usuarios", { method: "POST", body: JSON.stringify(request) });
};

// Actualizar usuario
export const updateUsuarioApi = async (request: SaveUsuario): Promise<Usuario> => {
  if (!request.id) throw new Error("ID requerido para actualizar usuario");
  return apiClient(`/usuarios/${request.id}`, { method: "PATCH", body: JSON.stringify(request) });
};

// Eliminar usuario
export const deleteUsuarioApi = async (id: number): Promise<void> => {
  return apiClient(`/usuarios/${id}`, { method: "DELETE" });
};

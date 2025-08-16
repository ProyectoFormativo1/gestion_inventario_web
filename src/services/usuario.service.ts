import { Usuario, SaveUsuario } from "@/types/usuario";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todos los usuarios
export const findAllUsuariosApi = async (): Promise<Usuario[]> => {
  const response = await fetch(`${BASE_URL}/usuarios`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
};

// Crear usuario
export const createUsuarioApi = async (request: SaveUsuario): Promise<Usuario> => {
  const response = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear el usuario");
  return response.json();
};

// Actualizar usuario
export const updateUsuarioApi = async (request: SaveUsuario): Promise<Usuario> => {
  if (!request.id) throw new Error("ID requerido para actualizar usuario");
  const response = await fetch(`${BASE_URL}/usuarios/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar el usuario");
  return response.json();
};

// Eliminar usuario
export const deleteUsuarioApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar el usuario");
};

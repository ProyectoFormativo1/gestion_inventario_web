import { Rol, SaveRol } from "@/types/rol";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener roles
export const findAllRolApi = async (): Promise<Rol[]> => {
  const response = await fetch(`${BASE_URL}/roles`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener roles");
  return response.json();
};

// Crear rol
export const createRolApi = async (request: SaveRol): Promise<Rol> => {
  const response = await fetch(`${BASE_URL}/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear rol");
  return response.json();
};

// Actualizar rol
export const updateRolApi = async (request: SaveRol): Promise<Rol> => {
  if (!request.id) throw new Error("ID requerido para actualizar rol");
  const response = await fetch(`${BASE_URL}/roles/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar rol");
  return response.json();
};

// Eliminar rol
export const deleteRolApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/roles/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar rol");
};

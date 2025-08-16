import { Programa, SavePrograma } from "@/types/programa";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todas las programas
export const findAllProgramaApi = async (): Promise<Programa[]> => {
  const response = await fetch(`${BASE_URL}/programas`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener programas");
  return response.json();
};

// Crear programa
export const createProgramaApi = async (request: SavePrograma): Promise<Programa> => {
  const response = await fetch(`${BASE_URL}/programas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear el programa");
  return response.json();
};

// Actualizar programa
export const updateProgramaApi = async (request: SavePrograma): Promise<Programa> => {
  if (!request.id) throw new Error("ID requerido para actualizar programa");
  const response = await fetch(`${BASE_URL}/programas/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar el programa");
  return response.json();
};

// Eliminar programa
export const deleteProgramaApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/programas/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar el programa");
};

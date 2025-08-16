import { Ficha, SaveFicha } from "@/types/ficha";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todas las fichas
export const findAllFichasApi = async (): Promise<Ficha[]> => {
  const response = await fetch(`${BASE_URL}/fichas`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener fichas");
  return response.json();
};

// Crear ficha
export const createFichaApi = async (request: SaveFicha): Promise<Ficha> => {
  const response = await fetch(`${BASE_URL}/fichas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear la ficha");
  return response.json();
};

// Actualizar ficha
export const updateFichaApi = async (request: SaveFicha): Promise<Ficha> => {
  if (!request.id) throw new Error("ID requerido para actualizar ficha");
  const response = await fetch(`${BASE_URL}/fichas/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la ficha");
  return response.json();
};

// Eliminar ficha
export const deleteFichaApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/fichas/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar la ficha");
};

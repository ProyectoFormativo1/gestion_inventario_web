import { Area, SaveArea } from "@/types/area";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todas las áreas
export const findAllAreasApi = async (): Promise<Area[]> => {
  const response = await fetch(`${BASE_URL}/areas`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener áreas");
  return response.json();
};

// Crear área
export const createAreaApi = async (request: SaveArea): Promise<Area> => {
  const response = await fetch(`${BASE_URL}/areas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear el área");
  return response.json();
};

// Actualizar área
export const updateAreaApi = async (request: SaveArea): Promise<Area> => {
  if (!request.id) throw new Error("ID requerido para actualizar área");
  const response = await fetch(`${BASE_URL}/areas/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar el área");
  return response.json();
};

// Eliminar área
export const deleteAreaApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/areas/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar el área");
};

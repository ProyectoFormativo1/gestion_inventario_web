import { Ciudad, SaveCiudad } from "@/types/ciudad";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todas las locacion
export const findAllCiudadesApi = async (): Promise<Ciudad[]> => {
  const response = await fetch(`${BASE_URL}/locacion`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener locacion");
  return response.json();
};

// Crear ciudad
export const createCiudadApi = async (request: SaveCiudad): Promise<Ciudad> => {
  const response = await fetch(`${BASE_URL}/locacion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear la ciudad");
  return response.json();
};

// Actualizar ciudad
export const updateCiudadApi = async (request: SaveCiudad): Promise<Ciudad> => {
  if (!request.id) throw new Error("ID requerido para actualizar ciudad");
  const response = await fetch(`${BASE_URL}/locacion/${request.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la ciudad");
  return response.json();
};

// Eliminar ciudad
export const deleteCiudadApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/locacion/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al eliminar la ciudad");
};

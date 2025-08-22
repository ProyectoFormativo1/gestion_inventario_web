import { Locacion, SaveCiudad } from "@/types/locacion";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todas las locacion
export const findAllLocacionesApi = async (): Promise<Locacion[]> => {
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
export const createLocacionApi = async (request: SaveCiudad): Promise<Locacion> => {
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
export const updateLocacionApi = async (request: SaveCiudad): Promise<Locacion> => {
  if (!request.id) throw new Error("ID requerido para actualizar locacion");
  const response = await fetch(`${BASE_URL}/locacion/${request.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la locacion");
  return response.json();
};

// Eliminar locacion
export const deleteLocacionApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/locacion/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al eliminar la locacion");
};

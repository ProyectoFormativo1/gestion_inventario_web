import { SaveSede, Sede } from "@/types/sede";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const findAllSedeApi = async (): Promise<Sede[]> => {
  const response = await fetch(`${BASE_URL}/sedes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener Sede");
  return response.json();
};


export const createSedeApi = async (request: SaveSede): Promise<Sede> => {
  const response = await fetch(`${BASE_URL}/sedes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear la sede");
  return response.json();
};

export const updateSedeApi = async (request: SaveSede): Promise<Sede> => {
  if (!request.id) throw new Error("ID requerido para actualizar sede");
  const response = await fetch(`${BASE_URL}/sedes/${request.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la sede");
  return response.json();
};

export const deleteSedeApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/sedes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al eliminar la sede");
};
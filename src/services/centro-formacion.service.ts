import { CentroFormacion, SaveCentroFormacion } from "@/types/centro-formacion";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const findAllcentrosFormacionApi = async (): Promise<CentroFormacion[]> => {
  const response = await fetch(`${BASE_URL}/centrosFormacion`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener centrosFormacion");
  return response.json();
};


export const createCentroFormacionApi = async (request: SaveCentroFormacion): Promise<CentroFormacion> => {
  const response = await fetch(`${BASE_URL}/centrosFormacion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear la centro formacion");
  return response.json();
};

export const updateCentroFormacionApi = async (request: SaveCentroFormacion): Promise<CentroFormacion> => {
  if (!request.id) throw new Error("ID requerido para actualizar centro formacion");
  const response = await fetch(`${BASE_URL}/centrosFormacion/${request.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la centro formacion");
  return response.json();
};

export const deleteCentroFormacionApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/centrosFormacion/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al eliminar la centro formacion");
};
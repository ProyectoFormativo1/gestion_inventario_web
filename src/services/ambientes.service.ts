import { Ambientes, SaveAmbientes } from "@/types/ambientes";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const findAllambientesApi = async (): Promise<Ambientes[]> => {
  const response = await fetch(`${BASE_URL}/ambientes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener ambientes");
  return response.json();
};


export const createAmbientesApi = async (request: SaveAmbientes): Promise<Ambientes> => {
  const response = await fetch(`${BASE_URL}/ambientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear la centro formacion");
  return response.json();
};

export const updateAmbientesApi = async (request: SaveAmbientes): Promise<Ambientes> => {
  if (!request.id) throw new Error("ID requerido para actualizar centro formacion");
  const response = await fetch(`${BASE_URL}/ambientes/${request.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la centro formacion");
  return response.json();
};

export const deleteAmbientesApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/ambientes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al eliminar la centro formacion");
};
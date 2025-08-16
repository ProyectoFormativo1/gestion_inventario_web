import { Bodega, SaveBodega } from "@/types/bodega";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const findAllbodegaApi = async (): Promise<Bodega[]> => {
  const response = await fetch(`${BASE_URL}/bodega`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al obtener bodega");
  return response.json();
};


export const createBodegaApi = async (request: SaveBodega): Promise<Bodega> => {
  const response = await fetch(`${BASE_URL}/bodega`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear la bodega");
  return response.json();
};

export const updateBodegaApi = async (request: SaveBodega): Promise<Bodega> => {
  if (!request.id) throw new Error("ID requerido para actualizar bodega");
  const response = await fetch(`${BASE_URL}/bodega/${request.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la bodega");
  return response.json();
};

export const deleteBodegaApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/bodega/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Error al eliminar la bodega");
};
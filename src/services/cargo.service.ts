import { Cargo, SaveCargo } from "@/types/cargo";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener cargos
export const findAllCargoApi = async (): Promise<Cargo[]> => {
  const response = await fetch(`${BASE_URL}/cargos`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener cargos");
  return response.json();
};

// Crear cargo
export const createCargoApi = async (request: SaveCargo): Promise<Cargo> => {
  const response = await fetch(`${BASE_URL}/cargos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear cargo");
  return response.json();
};

// Actualizar cargo
export const updateCargoApi = async (request: SaveCargo): Promise<Cargo> => {
  if (!request.id) throw new Error("ID requerido para actualizar cargo");
  const response = await fetch(`${BASE_URL}/cargos/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar cargo");
  return response.json();
};

// Eliminar cargo
export const deleteCargoApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/cargos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar cargo");
};

import { Material, SaveMaterial } from "@/types/material";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todos los materiales
export const findAllMaterialesApi = async (): Promise<Material[]> => {
  const response = await fetch(`${BASE_URL}/materiales`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener materiales");
  return response.json();
};

// Crear material
export const createMaterialApi = async (request: SaveMaterial): Promise<Material> => {
  const response = await fetch(`${BASE_URL}/materiales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear el material");
  return response.json();
};

// Actualizar material
export const updateMaterialApi = async (request: SaveMaterial): Promise<Material> => {
  if (!request.id) throw new Error("ID requerido para actualizar material");
  const response = await fetch(`${BASE_URL}/materiales/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar el material");
  return response.json();
};

// Eliminar material
export const deleteMaterialApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/materiales/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar el material");
};

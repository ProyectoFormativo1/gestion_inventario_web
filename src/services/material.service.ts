import { Material, SaveMaterial } from "@/types/material";
import { apiClient } from "@/utils/api-client.util";

// Obtener todos los materiales
export const findAllMaterialesByBodegaApi = async (bodegaId: number): Promise<Material[]> => {
  return apiClient(`/materiales/bodega/${bodegaId}`, { method: "GET" });
};

// Crear material
export const createMaterialApi = async (request: SaveMaterial): Promise<Material> => {
  return apiClient(`/materiales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
};

// Actualizar material
export const updateMaterialApi = async (request: SaveMaterial): Promise<Material> => {
  if (!request.id) throw new Error("ID requerido para actualizar material");
  return apiClient(`/materiales/${request.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  }); 
};

// Eliminar material
export const deleteMaterialApi = async (id: number): Promise<void> => {
  return apiClient(`/materiales/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

import { Area, SaveArea } from "@/types/area";
import { apiClient } from "@/utils/api-client.util";

// Obtener todas las áreas
export const findAllAreasApi = async (): Promise<Area[]> => {
  return apiClient("/areas", { method: "GET" });
};

export const findAllAreasBySedesApi = async (
  sedeId: number
): Promise<Area[]> => {
  return apiClient(`/areas/sede/${sedeId}`, { method: "GET" });
};

// Crear área
export const createAreaApi = async (request: SaveArea): Promise<Area> => {
  return apiClient("/areas", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

// Actualizar área
export const updateAreaApi = async (request: SaveArea): Promise<Area> => {
  if (!request.id) throw new Error("ID requerido para actualizar área");
  return apiClient(`/areas/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

// Eliminar área
export const deleteAreaApi = async (id: number): Promise<void> => {
  return apiClient(`/areas/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

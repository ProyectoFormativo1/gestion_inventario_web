import { UnidadMedida, SaveUnidadMedida } from "@/types/unidad-medida";
import { apiClient } from "@/utils/api-client.util";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todas las unidades de medida
export const findAllUnidadesMedidaApi = async (): Promise<UnidadMedida[]> => {
  return apiClient("/unidad_medida", { method: "GET" });
};

// Crear unidad de medida
export const createUnidadMedidaApi = async (request: SaveUnidadMedida): Promise<UnidadMedida> => {
  return apiClient("/unidad_medida", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
};

// Actualizar unidad de medida
export const updateUnidadMedidaApi = async (request: SaveUnidadMedida): Promise<UnidadMedida> => {
  if (!request.id) throw new Error("ID requerido para actualizar la unidad de medida");
  return apiClient(`/unidad_medida/${request.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
};

// Eliminar unidad de medida
export const deleteUnidadMedidaApi = async (id: number): Promise<void> => {
  return apiClient(`/unidad_medida/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

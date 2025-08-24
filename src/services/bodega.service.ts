import { Bodega, SaveBodega } from "@/types/bodega";
import { apiClient } from "@/utils/api-client.util";

export const findAllBodegasApi = async (): Promise<Bodega[]> => {
  return apiClient("/bodega", { method: "GET" });
};

export const findAllBodegasBySedeApi = async (
  sedeId: number
): Promise<Bodega[]> => {
  return apiClient(`/bodega/sede/${sedeId}`, { method: "GET" });
};

export const createBodegaApi = async (request: SaveBodega): Promise<Bodega> => {
  return apiClient("/bodega", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

export const updateBodegaApi = async (request: SaveBodega): Promise<Bodega> => {
  if (!request.id) throw new Error("ID requerido para actualizar bodega");
  return apiClient(`/bodega/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

export const deleteBodegaApi = async (id: number): Promise<void> => {
  return apiClient(`/bodega/${id}`, {
    method: "DELETE",
  });
};
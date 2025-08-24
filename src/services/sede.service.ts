import { SaveSede, Sede } from "@/types/sede";
import { apiClient } from "@/utils/api-client.util";

export const findAllSedeApi = async (): Promise<Sede[]> => {
  return apiClient("/sedes", { method: "GET" });
};

export const findAllSedesByCentrosFormacionApi = async (centroformacionId: number): Promise<Sede[]> => {
    return apiClient(`/sedes/centroformacion/${centroformacionId}`, { method: "GET" });
};

export const createSedeApi = async (request: SaveSede): Promise<Sede> => {
  return apiClient("/sedes", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

export const updateSedeApi = async (request: SaveSede): Promise<Sede> => {
  if (!request.id) throw new Error("ID requerido para actualizar sede");

  return apiClient(`/sedes/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

export const deleteSedeApi = async (id: number): Promise<void> => {
  return apiClient(`/sedes/${id}`, {
    method: "DELETE",
  });
};
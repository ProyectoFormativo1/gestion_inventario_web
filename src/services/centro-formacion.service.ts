import { CentroFormacion, SaveCentroFormacion } from "@/types/centro-formacion";
import { apiClient } from "@/utils/api-client.util";


export const findAllcentrosFormacionApi = async (): Promise<CentroFormacion[]> => {
    return apiClient("/centroformacion", { method: "GET" });
};

export const findAllcentrosFormacionByLocacionApi = async (locacionId: number): Promise<CentroFormacion[]> => {
    return apiClient(`/centroformacion/locacion/${locacionId}`, { method: "GET" });
};

export const createCentroFormacionApi = async (request: SaveCentroFormacion): Promise<CentroFormacion> => {
  return apiClient("/centroformacion", {
    method: "POST",
    body: JSON.stringify(request),
  });
};


export const updateCentroFormacionApi = async (request: SaveCentroFormacion): Promise<CentroFormacion> => {
  if (!request.id) throw new Error("ID requerido para actualizar centro formacion");
  return apiClient(`/centroformacion/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

export const deleteCentroFormacionApi = async (id: number): Promise<void> => {
  return apiClient(`/centroformacion/${id}`, {
    method: "DELETE",
  });
};
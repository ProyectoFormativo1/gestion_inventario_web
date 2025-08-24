import { Ambientes, SaveAmbientes } from "@/types/ambientes";
import { apiClient } from "@/utils/api-client.util";

export const findAllambientesApi = async (): Promise<Ambientes[]> => {
  return apiClient("/ambientes", { method: "GET" });
};

export const createAmbientesApi = async (request: SaveAmbientes): Promise<Ambientes> => {
  return apiClient("/ambientes", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

export const updateAmbientesApi = async (request: SaveAmbientes): Promise<Ambientes> => {
  if (!request.id) throw new Error("ID requerido para actualizar centro formacion");
  return apiClient(`/ambientes/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

export const deleteAmbientesApi = async (id: number): Promise<void> => {
  return apiClient(`/ambientes/${id}`, {
    method: "DELETE",
  });
};
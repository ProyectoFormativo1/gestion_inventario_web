import { Categoria, SaveCategoria } from "@/types/categoria";
import { apiClient } from "@/utils/api-client.util";

export const findAllCategoriasApi = async (): Promise<Categoria[]> => {
  return apiClient("/categoria", { method: "GET" });
};

export const createCategoriaApi = async (
  request: SaveCategoria
): Promise<Categoria> => {
  return apiClient("/categoria", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

export const updateCategoriaApi = async (
  request: SaveCategoria
): Promise<Categoria> => {
  if (!request.id) throw new Error("ID requerido para actualizar categoría");
  return apiClient(`/categoria/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

export const deleteCategoriaApi = async (id: number): Promise<void> => {
  return apiClient(`/categoria/${id}`, {
    method: "DELETE",
  });
};

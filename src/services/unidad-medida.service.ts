import { UnidadMedida, SaveUnidadMedida } from "@/types/unidad-medida";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Obtener todas las unidades de medida
export const findAllUnidadesMedidaApi = async (): Promise<UnidadMedida[]> => {
  const response = await fetch(`${BASE_URL}/unidades-medida`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al obtener unidades de medida");
  return response.json();
};

// Crear unidad de medida
export const createUnidadMedidaApi = async (request: SaveUnidadMedida): Promise<UnidadMedida> => {
  const response = await fetch(`${BASE_URL}/unidades-medida`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear la unidad de medida");
  return response.json();
};

// Actualizar unidad de medida
export const updateUnidadMedidaApi = async (request: SaveUnidadMedida): Promise<UnidadMedida> => {
  if (!request.id) throw new Error("ID requerido para actualizar la unidad de medida");
  const response = await fetch(`${BASE_URL}/unidades-medida/${request.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al actualizar la unidad de medida");
  return response.json();
};

// Eliminar unidad de medida
export const deleteUnidadMedidaApi = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/unidades-medida/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al eliminar la unidad de medida");
};

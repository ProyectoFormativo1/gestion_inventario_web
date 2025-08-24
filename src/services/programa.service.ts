import { Programa, SavePrograma } from "@/types/programa";
import { apiClient } from "@/utils/api-client.util";

// Obtener todas las programas
export const findAllProgramaApi = async (): Promise<Programa[]> => {
    return apiClient("/programas", { method: "GET" });
};


// Crear programa
export const createProgramaApi = async (request: SavePrograma): Promise<Programa> => {
  return apiClient("/programas", {
    method: "POST",
    body: JSON.stringify(request),
  });
};

// Actualizar programa
export const updateProgramaApi = async (request: SavePrograma): Promise<Programa> => {
  if (!request.id) throw new Error("ID requerido para actualizar programa");
  return apiClient(`/programas/${request.id}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
};

// Eliminar programa
export const deleteProgramaApi = async (id: number): Promise<void> => {
  return apiClient(`/programas/${id}`, {
    method: "DELETE",
  });
};

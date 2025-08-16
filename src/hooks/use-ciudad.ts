import {
  createCiudadApi,
  deleteCiudadApi,
  findAllCiudadesApi,
  updateCiudadApi,
} from "@/services/ciudad.service";
import { Ciudad } from "@/types/ciudad";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useCiudades() {
  const queryClient = useQueryClient();

  // GET
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Ciudad[]>({
    queryKey: ["locacion"],
    queryFn: findAllCiudadesApi,
    select: (data) =>
      data.map((ciudad) => ({
        ...ciudad,
        key: ciudad.id, // agregamos la key para el datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createCiudadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locacion"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateCiudadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locacion"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteCiudadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locacion"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createCiudad: createMutation.mutate,
    updateCiudad: updateMutation.mutate,
    deleteCiudad: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

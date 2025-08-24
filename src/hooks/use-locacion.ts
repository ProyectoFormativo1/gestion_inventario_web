import {
  createLocacionApi,
  deleteLocacionApi,
  findAllLocacionesApi,
  updateLocacionApi,
} from "@/services/locacion.service";
import {  Locacion } from "@/types/locacion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useLocacion() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: ciudades,
    isLoading,
    isError,
    refetch,
  } = useQuery<Locacion[]>({
    queryKey: ["locacion", "ciudad"],
    queryFn: findAllLocacionesApi,
    select: (data) => {
      return data.filter(a=>a.tipo==='ciudad').map((ciudad) => ({
        ...ciudad,
        key: ciudad.id, // agregamos la key para el datatable
      }))
    }
  });

   // GET
  const {
    data: departamentos,
  } = useQuery<Locacion[]>({
  queryKey: ["locacion", "departamento"],
    queryFn: findAllLocacionesApi,
    select: (data) =>
      data.filter(a=>a.tipo==='departamento').map((ciudad) => ({
        ...ciudad,
        key: ciudad.id, // agregamos la key para el datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createLocacionApi,
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["locacion", "ciudad"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateLocacionApi,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["locacion", "ciudad"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteLocacionApi,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["locacion", "ciudad"] });
    },
  });

  return {
    ciudades,
    departamentos,
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

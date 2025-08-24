// useSede.ts
import {
  createSedeApi,
  deleteSedeApi,
  findAllSedeApi,
  findAllSedesByCentrosFormacionApi,
  updateSedeApi,
} from "@/services/sede.service";
import { Sede } from "@/types/sede";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useSedesByCentros(centroformacionId?: number | null) {
  return useQuery<Sede[]>({
    queryKey: ["sedesByCentros", centroformacionId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return findAllSedesByCentrosFormacionApi(id as number);
    },
    enabled: !!centroformacionId,
  });
}


export function useSede() {
  const queryClient = useQueryClient();
  // GET
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Sede[]>({
    queryKey: ["sede"],
    queryFn: findAllSedeApi,
    select: (data) =>
      data.map((centro) => ({
        ...centro,
        key: centro.id, // agregamos la key ara el datatable
      })),
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: createSedeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sede"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateSedeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sede"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteSedeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sede"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createSede: createMutation.mutate,
    updateSede: updateMutation.mutate,
    deleteSede: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

// useCentrosFormacion.ts

import {
  createCentroFormacionApi,
  deleteCentroFormacionApi,
  findAllcentrosFormacionApi,
  findAllcentrosFormacionByLocacionApi,
  updateCentroFormacionApi,
} from "@/services/centro-formacion.service";
import { CentroFormacion } from "@/types/centro-formacion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export function useCentrosFormacionByLocacion(locacionId?: number | null) {
  return useQuery<CentroFormacion[]>({
    queryKey: ["centrosFormacionBylocacion", locacionId],
    queryFn: ({ queryKey }) => {
      const [, locId] = queryKey;
      return findAllcentrosFormacionByLocacionApi(locId as number);
    },
    enabled: !!locacionId,
  });
}


export function useCentrosFormacion() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<CentroFormacion[]>({
    queryKey: ["centrosFormacion"],
    queryFn: findAllcentrosFormacionApi,
    select: (data) =>
      data.map((centro) => ({
        ...centro,
        key: centro.id, // agregamos la key ara el datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createCentroFormacionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrosFormacion"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateCentroFormacionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrosFormacion"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteCentroFormacionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centrosFormacion"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createCentroFormacion: createMutation.mutate,
    updateCentroFormacion: updateMutation.mutate,
    deleteCentroFormacion: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

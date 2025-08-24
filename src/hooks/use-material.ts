import { createMaterialApi, deleteMaterialApi, findAllMaterialesByBodegaApi, updateMaterialApi } from "@/services/material.service";
import { Material } from "@/types/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMaterial(bodegaId?: number | null) {
  const queryClient = useQueryClient();

  // GET
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Material[]>({
    queryKey: ["materiales", bodegaId],
     queryFn: ({ queryKey }) => {
        const [, bodegaId] = queryKey;
        return findAllMaterialesByBodegaApi(bodegaId as number);
      },
    select: (data) =>
      data.map((material) => ({
        ...material,
        key: material.id, // key para DataTable
      })),
    enabled: !!bodegaId, // habilitar la consulta solo si bodegaId está disponible
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createMaterialApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materiales"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateMaterialApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materiales"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteMaterialApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materiales"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createMaterial: createMutation.mutate,
    updateMaterial: updateMutation.mutate,
    deleteMaterial: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

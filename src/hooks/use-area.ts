import {
  createAreaApi,
  deleteAreaApi,
  findAllAreasApi,
  updateAreaApi,
} from "@/services/area.service";
import { Area } from "@/types/area";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAreas() {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<Area[]>({
    queryKey: ["areas"],
    queryFn: findAllAreasApi,
    select: (data) =>
      data.map((area) => ({
        ...area,
        key: area.id, // key para datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createAreaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["areas"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateAreaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["areas"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteAreaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["areas"] }),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createArea: createMutation.mutate,
    updateArea: updateMutation.mutate,
    deleteArea: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

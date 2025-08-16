import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Cargo } from "@/types/cargo";
import { createCargoApi, deleteCargoApi, findAllCargoApi, updateCargoApi } from "@/services/cargo.service";

export function useCargo() {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<Cargo[]>({
    queryKey: ["cargo"],
    queryFn: findAllCargoApi,
    select: (data) =>
      data.map((cargo) => ({
        ...cargo,
        key: cargo.id,
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createCargoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cargo"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateCargoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cargo"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteCargoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cargo"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createCargo: createMutation.mutate,
    updateCargo: updateMutation.mutate,
    deleteCargo: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

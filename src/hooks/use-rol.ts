import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Rol } from "@/types/rol";
import { createRolApi, deleteRolApi, findAllRolApi, updateRolApi } from "@/services/rol.service";

export function useRol() {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<Rol[]>({
    queryKey: ["roles"],
    queryFn: findAllRolApi,
    select: (data) =>
      data.map((rol) => ({
        ...rol,
        key: rol.id,
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createRolApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateRolApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteRolApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createRol: createMutation.mutate,
    updateRol: updateMutation.mutate,
    deleteRol: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

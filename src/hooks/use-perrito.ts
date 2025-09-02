import {
  createPerritoApi,
  deletePerritoApi,
  findAllPerritoApi,
  updatePerritoApi,
} from "@/services/perrito.service";
import { Perrito } from "@/types/perrito";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function usePerritos() {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<Perrito[]>({
    queryKey: ["perrito"],
    queryFn: findAllPerritoApi,
    select: (data) =>
      data.map((perrito) => ({
        ...perrito,
        key: perrito.id, // key para datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createPerritoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["perrito"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updatePerritoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["perrito"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deletePerritoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["perrito"] }),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createPerrito: createMutation.mutate,
    updatePerrito: updateMutation.mutate,
    deletePerrito: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

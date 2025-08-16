import {
  createProgramaApi,
  deleteProgramaApi,
  findAllProgramaApi,
  updateProgramaApi,
} from "@/services/programa.service";
import { Programa } from "@/types/programa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useProgramas() {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<Programa[]>({
    queryKey: ["programas"],
    queryFn: findAllProgramaApi,
    select: (data) =>
      data.map((progrma) => ({
        ...progrma,
        key: progrma.id, // key para datatable
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createProgramaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programas"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateProgramaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programas"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteProgramaApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["programas"] }),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createPrograma: createMutation.mutate,
    updatePrograma: updateMutation.mutate,
    deletePrograma: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

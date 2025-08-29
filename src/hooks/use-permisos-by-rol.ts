import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRolPermisoApi,
  deleteRolPermisoApi,
  findAllPermisosByRolApi,
} from "@/services/rol.service";
import { PermisosResponse } from "@/types/permiso-rol";

export function usePermisosByRol(rolId?: number | null) {
  const queryClient = useQueryClient();

  // GET
  const { data, isLoading, isError, refetch } = useQuery<PermisosResponse>({
    queryKey: ["permisos-by-rol", rolId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return findAllPermisosByRolApi(id as number);
    },
    enabled: !!rolId,
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createRolPermisoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permisos-by-rol"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: ({ rolId, permisoId }: { rolId: number; permisoId: number }) =>
      deleteRolPermisoApi(rolId, permisoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permisos-by-rol"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createPermiso: createMutation.mutate,
    deletePermiso: deleteMutation.mutate,
    createStatus: createMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

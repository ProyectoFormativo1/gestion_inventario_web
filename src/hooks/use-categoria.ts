// useCategorias.ts

import {
  createCategoriaApi,
  deleteCategoriaApi,
  findAllCategoriasApi,
  updateCategoriaApi,
} from "@/services/categoria.service";
import { Categoria } from "@/types/categoria";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// GET Categorías (con materiales si tu backend ya lo retorna)
export function useCategorias() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: data,
    isLoading,
    isError,
    refetch,
  } = useQuery<Categoria[]>({
    queryKey: ["categorias"],
    queryFn: findAllCategoriasApi,
    select: (data) =>
      data.map((categoria) => ({
        ...categoria,
        key: categoria.id, 
      })),
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createCategoriaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: updateCategoriaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteCategoriaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    createCategoria: createMutation.mutate,
    updateCategoria: updateMutation.mutate,
    deleteCategoria: deleteMutation.mutate,
    createStatus: createMutation.status,
    updateStatus: updateMutation.status,
    deleteStatus: deleteMutation.status,
  };
}

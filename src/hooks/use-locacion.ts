// useLocacion.ts
import { findAllLocationsApi } from "@/services/location.service";
import { Location } from "@/types/location";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useLocacion() {
  const queryClient = useQueryClient();

  // GET
  const {
    data: ciudades,
    isLoading,
    isError,
    refetch,
  } = useQuery<Location[]>({
    queryKey: ["locacion"],
    queryFn: findAllLocationsApi,
    select: (data) =>
      data.filter(a=>a.tipo==='ciudad').map((centro) => ({
        ...centro,
        key: centro.id, // agregamos la key ara el datatable
      })),
  });


  return {
    ciudades,
    isLoading,
    isError,
    refetch
  };
}
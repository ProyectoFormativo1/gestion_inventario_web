import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MovimientoSerie, Statistics } from "../models/statistics";
import { StatisticsApi, statisticsApi } from "../services/statistics.service";

export const useStatistics = (): UseQueryResult<Statistics, Error> => {
  return useQuery<StatisticsApi, Error, Statistics>({
    queryKey: ['statistics'],
    queryFn: () => statisticsApi(),
    select: (apiData: StatisticsApi) => {
      const entradas = new MovimientoSerie("Entradas", (apiData.movimientosAnioActual ?? []).map(mov => ({
        key: mov.nombreMes,
        value: mov.entradas,
      })));
      const salidas = new MovimientoSerie("Salidas", (apiData.movimientosAnioActual ?? []).map(mov => ({
        key: mov.nombreMes,
        value: mov.salidas,
      })));
      return {
      materiales: apiData.materiales,
      proximosAVencer: apiData.proximosAVencer,
      reabastecimientos: apiData.reabastecimientos,
      movimientosHoy: apiData.movimientosHoy,
      movimientoDatasets: [
        entradas,
        salidas
      ],
    }
    },
    retry: 3,
  });
};

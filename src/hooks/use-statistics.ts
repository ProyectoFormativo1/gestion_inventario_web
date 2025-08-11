import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Statistics } from "../models/statistics";
import { statisticsApi } from "../services/statistics.service";

export const useStatistics = (): UseQueryResult<Statistics, Error> => {
  return useQuery<Statistics, Error>({
    queryKey: ['statistics '],
    queryFn: () => statisticsApi(),
    retry: 3
  });
}

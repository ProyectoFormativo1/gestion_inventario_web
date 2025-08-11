import { Statistics, TrendSerie, WarehouseSerie } from "../models/statistics";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const statisticsApi = async (): Promise<Statistics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalActiveUsers: 200,
        monthlyChangePercentageUsers: 23,
        totalProducts: 300,
        monthlyChangePercentageProducts: 30,
        totalActiveLoans: 50,
        monthlyChangePercentageLoans: 22,
          percentReturnCup: 80,
          monthlyChangePercentageReturnCup: 12,
        trendDatasets: [
          new TrendSerie("Usuarios Activos", [
            { key: "Enero", value: 30 },
            { key: "Febrero", value: 50 },
            { key: "Marzo", value: 40 },
          ]),
          new TrendSerie("Prestamos Activos", [
            { key: "Enero", value: 10 },
            { key: "Febrero", value: 50 },
            { key: "Marzo", value: 90 },
          ]),
          new TrendSerie("Productos", [
            {  key: "Enero", value: 45 },
            { key: "Febrero", value: 67 },
            { key: "Marzo", value: 56 },
          ]),
        ],
        warehouseDatasets: [
          new WarehouseSerie("TIC", 10),
          new WarehouseSerie("Gastronomia", 50),
          new WarehouseSerie("Multimedoa", 56),
          new WarehouseSerie("Agropecuaria", 23),
          new WarehouseSerie("E.N. Cafe", 43),
        ],
      });
    }, 1000); // Simula un retraso de 1 segundo
  });
};

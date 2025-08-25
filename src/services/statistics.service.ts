import { apiClient } from "@/utils/api-client.util";

export const statisticsApi = async (): Promise<StatisticsApi> => {
  return apiClient("/estadistica", { method: "GET" });
};

export interface StatisticsApi {
  materiales: {
    total: number;
    porcentajeCrecimiento: number;
  };
  proximosAVencer: ProximoAVencer[];
  reabastecimientos: number;
  movimientosHoy: {
    total: number;
    entradas: number;
    salidas: number;
  };
  movimientosAnioActual: MovimientoMensual[];
}

export interface ProximoAVencer {
  id: number;
  nombre: string;
  fecha_vencimiento: string; // ISO string (Date en backend)
  bodegaNombre: string;
  stok: number;
}

export interface MovimientoMensual {
  mes: string;        // formato "YYYY-MM"
  nombreMes: string;  // ejemplo: "Enero"
  numeroMes: number;  // 1 - 12
  entradas: number;
  salidas: number;
}

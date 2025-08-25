export interface ItemSerie {
    key: string;
    value: number;
}
  
export class MovimientoSerie {
    constructor(public label: string, public data: ItemSerie[]) {
    }
  }

export class Statistics {
    constructor(
        public materiales: { total: number, porcentajeCrecimiento: number },
        public proximosAVencer: StatisticsMateriales[],
        public reabastecimientos: number,
        public movimientosHoy: { total: number, entradas: number, salidas: number },
        public movimientoDatasets: MovimientoSerie[]
    ){}
}

export interface StatisticsMateriales {
    id: number;
    nombre: string;
    fecha_vencimiento: string;
    stok: number;
    bodegaNombre: string;
}

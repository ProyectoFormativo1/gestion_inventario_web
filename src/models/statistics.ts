export interface ItemSerie {
    key: string;
    value: number;
}


export class WarehouseSerie {
    constructor(public label: string, public data: number) {
    }
}
export class TrendSerie {
    constructor(public label: string, public data: ItemSerie[]) {
    }
  }

export class Statistics {
    constructor(
        public totalActiveUsers: number,
        public monthlyChangePercentageUsers: number,
        public totalProducts: number,
        public monthlyChangePercentageProducts: number,
        public totalActiveLoans: number,
        public monthlyChangePercentageLoans: number,
        public percentReturnCup: number,
        public monthlyChangePercentageReturnCup: number,

        public warehouseDatasets: WarehouseSerie[],
        public trendDatasets: TrendSerie[],
    ){}
}
import { Base } from "./base";

// Modelo para TipoMovimiento
export type TipoMovimiento = {
    id: number;
    codigo: number;
    descripcion: string;
    tipo: string;
} & Base;

export enum TipoMovimientoEnum {
    ENTRADA = "entrada",
    SALIDA = "salida"
}
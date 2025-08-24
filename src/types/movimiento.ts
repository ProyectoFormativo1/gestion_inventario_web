import { Base } from "./base";

// Modelo para Movimiento
export type Movimiento = {
  id: number;
  cantidad: number;
  fecha: Date;
  observaciones: string;
  materialId: number;
  responsableId: number;
  tipoMovimientoId: number;
  materialNombre: string;
  responsableNombre: string;
  tipoMovimientoDescripcion: string;
  tipoMovimientoNombre: string;
  tipoMovimientoCodigo: string;
} & Base;

// Modelo para crear/editar Movimiento
export type SaveMovimiento = {
  id?: number;
  cantidad: number;
  observaciones: string;
  materialId: number;
  responsableId: number;
  tipoMovimientoId: number;
};

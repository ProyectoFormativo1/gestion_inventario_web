import { Base } from "./base";

// Modelo para Material
export type Material = {
  id: number;
  nombre: string;
  stok: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  numero_contrato: string;
  fecha_vencimiento: Date;
  fecha_vigencia: Date;
  codigo_sena: string;
  codigo_unspsc: string;
  tipo: string;
  bodega_id: number;
  unidad_medida_id: number;
  bodegaNombre?: string;
  unidadMedidaNombre?: string;
} & Base;

// Modelo para crear/editar Material
export type SaveMaterial = {
  id?: number;
  nombre: string;
  stok: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  numero_contrato: string;
  fecha_vencimiento: Date;
  fecha_vigencia: Date;
  codigo_sena: string;
  codigo_unspsc: string;
  tipo: string;
  bodega_id: number;
  unidad_medida_id: number;
};

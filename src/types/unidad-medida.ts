import { Base } from "./base";

// Modelo para Unidad de Medida
export type UnidadMedida = {
  id: number;
  nombre: string;
  simbolo: string;
  tipo: string;
  descripcion?: string;
  fecha_creacion: Date;
} & Base;

// Modelo para crear/editar Unidad de Medida
export type SaveUnidadMedida = {
  id?: number;
  nombre: string;
  simbolo: string;
  tipo: string;
  descripcion?: string;
  fecha_creacion: Date;
};

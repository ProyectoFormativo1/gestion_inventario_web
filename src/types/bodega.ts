import { Base } from "./base";

export type Bodega = {
  id: number;
  nombre: string;
  descripcion: string;
  areaId: number;
  areaNombre: string;
  sedeId: number;
  sedeNombre?: string;
  centroFormacionNombre: string;
  centroFormacionId: number;
  locacionId: number;
  locacionNombre: string;
} & Base;

// Modelo para Crear y Editar Centro de Formacion
export type SaveBodega = {
  id?: number;
  nombre: string;
  areaId: number;
  descripcion: string;
};

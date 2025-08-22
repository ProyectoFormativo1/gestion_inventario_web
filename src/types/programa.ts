import { Base } from "./base";
// Modelo para programa
export type Programa = {
  id: number;
  nombre: string;
  areaId: number;
  areaNombre?: string; 
  sedeId: number;
  sedeNombre?: string; 
  centroFormacionNombre: string;
  centroFormacionId: number;
  locacionId: number;
  locacionNombre: string;
  fichaId: number;
  fichaNombre: string;
} & Base;

// Modelo para crear/editar Programa
export type SavePrograma = {
  id?: number;
  nombre: string;
  areaId: number;
};

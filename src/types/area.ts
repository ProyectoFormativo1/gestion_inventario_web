import { Base } from "./base";

// Modelo para Area
export type Area = {
  id: number;
  nombre: string;
  sedeId: number;
  sedeNombre?: string; 
  centroFormacionNombre: string;
  centroFormacionId: number;
  locacionId: number;
  locacionNombre: string;
} & Base;

// Modelo para crear/editar Area
export type SaveArea = {
  id?: number;
  nombre: string;
  sedeId: number;
};

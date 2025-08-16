import { Base } from "./base";

// Modelo para Area
export type Area = {
  id: number;
  nombre: string;
  sedeId: number;
  sedeNombre?: string; // opcional para mostrar en listas
} & Base;

// Modelo para crear/editar Area
export type SaveArea = {
  id?: number;
  nombre: string;
  sedeId: number;
};

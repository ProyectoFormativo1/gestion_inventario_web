import { Base } from "./base";

// Modelo para programa
export type Programa = {
  id: number;
  nombre: string;
  areaId: number;
  areaNombre?: string; // opcional para mostrar en listas
} & Base;

// Modelo para crear/editar Programa
export type SavePrograma = {
  id?: number;
  nombre: string;
  areaId: number;
};

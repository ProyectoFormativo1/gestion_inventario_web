import { Base } from "./base";

// Modelo para Ficha
export type Ficha = {
  id: number;
  codigo: string;
  fecha_creacion: string; // en formato YYYY-MM-DD
  programaId: number;
  programaNombre?: string; // opcional para mostrar en listas
} & Base;

// Modelo para crear/editar Ficha
export type SaveFicha = {
  id?: number;
  codigo: string;
  fecha_creacion: string;
  programaId: number;
};

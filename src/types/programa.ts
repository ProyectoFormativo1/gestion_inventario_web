import { Base } from "./base";
// Modelo para programa
export type Programa = {
  id: number;
  nombre: string;
  descripcion: string;
} & Base;

// Modelo para crear/editar Programa
export type SavePrograma = {
  id?: number;
  nombre: string;
  descripcion: string;
};

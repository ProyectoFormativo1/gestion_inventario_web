import { Base } from "./base";

export type Categoria = {
  id: number;
  nombre: string;
  codigoUnspsc: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
} & Base;

// Modelo para Crear y Editar Categoría
export type SaveCategoria = {
  id?: number;
  nombre: string;
  codigoUnspsc: string;
};

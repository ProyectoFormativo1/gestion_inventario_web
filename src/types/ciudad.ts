import { Base } from "./base";

// Modelo de Ciudad (lectura)
export type Ciudad = {
  id: number;
  nombre: string;
  tipo: string;
  codigoPostal: string;
  parentId: number | null;
  parentNombre?: string; // opcional si quieres mostrar el nombre del padre
} & Base;

// Modelo para Crear y Editar Ciudad
export type SaveCiudad = {
  id?: number;
  nombre: string;
  tipo: string;
  codigoPostal: string;
  parentId: number | null;
};

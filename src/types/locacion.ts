import { Base } from "./base";

// Modelo de Locacion (lectura)
export type Locacion = {
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

import { Base } from "./base";

// Modelo para Usuario
export type Usuario = {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  cargoId: number;
  rolId: number;
  fecha_creacion: Date;
  cargoNombre?: string; // opcional para mostrar en tablas
  rolNombre?: string;   // opcional para mostrar en tablas
} & Base;

// Modelo para crear/editar Usuario
export type SaveUsuario = {
  id?: number;
  nombres: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  cargoId: number;
  rolId: number;
  fecha_creacion: Date;
};

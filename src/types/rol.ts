import { Base } from "./base";

// Modelo para Rol
export type Rol = {
  id: number;
  nombre: string;        
  codigo: string;      
  fecha_creacion: Date;
} & Base;

// Modelo para crear/editar Rol
export type SaveRol = {
  id?: number;
  nombre: string;        
  codigo: string;
  fecha_creacion?: Date;
};

import { Base } from "./base";
import { Role } from "@/models/role";

// Modelo para Rol
export type Rol = {
  id: number;
  nombre: Role;        
  codigo: string;      
  fecha_creacion: Date;
} & Base;

// Modelo para crear/editar Rol
export type SaveRol = {
  id?: number;
  nombre: Role;        
  codigo: string;
  fecha_creacion?: Date;
};

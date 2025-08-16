import { Base } from "./base";

export type Cargo = {
  id: number;
  nombre: string;
} & Base;

// Modelo para crear/editar Cargo
export type SaveCargo = {
  id?: number;
  nombre: string;
};

import { Base } from "./base";
export type Perrito = {
  id: number;
  nombre: string;
  color: string;
} & Base;

export type SavePerrito = {
  id?: number;
  nombre: string;
  color: string;
};

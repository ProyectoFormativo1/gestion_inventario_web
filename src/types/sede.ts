import { Base } from "./base";

// Modelo principal de sede- Lista
export type Sede = {
    id: number;
    nombre: string;
    centroFormacionNombre: string;
    centroFormacionId: number;
} & Base;

// Modelo para Crear y Editar Sede
export type SaveSede = {
    id?: number;
    nombre: string;
    centroFormacionId: number;
};
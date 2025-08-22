import { Base } from "./base";

// Modelo principal de sede- Lista
export type Sede = {
    id: number;
    nombre: string;
    centroFormacionNombre: string;
    centroFormacionId: number;
    locacionId: number;
    locacionNombre: string;
} & Base;

// Modelo para Crear y Editar Sede
export type SaveSede = {
    id?: number;
    nombre: string;
    centroFormacionId: number;
};
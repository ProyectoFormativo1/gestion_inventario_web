import { Base } from "./base";

// Agregamos base para disponer la propiedad key
export type CentroFormacion = {
    id: number;
    nombre: string;
    locacionId: number;
    locacionNombre: string;
} & Base;

// Modelo para Crear y Editar Centro de Formacion
export type SaveCentroFormacion = {
    id?: number;
    nombre: string;
    locacionId: number;
};
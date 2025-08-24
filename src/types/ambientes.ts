import { Base } from "./base";

// Agregamos base para disponer la propiedad key
export type Ambientes = {
    id: number;
    nombre: string;
    areaId: number;
    areaNombre?: string; 
    sedeId: number;
    sedeNombre?: string; 
    centroFormacionNombre: string;
    centroFormacionId: number;
    locacionId: number;
    locacionNombre: string;
} & Base;

// Modelo para Crear y Editar Centro de Formacion
export type SaveAmbientes = {
    id?: number;
    nombre: string;
    areaId: number;
};
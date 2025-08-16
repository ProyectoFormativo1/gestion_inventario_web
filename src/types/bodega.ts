import { Base } from "./base";

export type Bodega = {
    id: number;
    nombre: string;
    areaId: number;
    areaNombre: string;
} & Base;

// Modelo para Crear y Editar Centro de Formacion
export type SaveBodega = {
    id?: number;
    nombre: string;
    areaId: number;
};
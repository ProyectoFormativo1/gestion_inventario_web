
export type SaveRolPermiso = {
  rolId: number;
  permisoId: number;
};

export type RolPermiso = {
    rolId: number;
  permisoId: number;
} ;



export type Permiso = {
  id: number;
  nombre: string;
  descripcion: string;
  modulo: string;
  asignado: boolean;
};

export type PermisoModulo = {
  rolId: number;
  rolNombre: string;
  modulo: string;
  permisos: Permiso[];
};

// Si quieres representar un array de todos los módulos
export type PermisosResponse = PermisoModulo[];
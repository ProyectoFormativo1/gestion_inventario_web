export class User {
    constructor(
        public id: number,
        public nombres: string,
        public apellidos: string,
        public correo: string,
        public cargoId: number,
        public roleId: number,
        public rolNombre: string,
        public cargoNombre: string,
        public permisos: string[],
    ){}
}
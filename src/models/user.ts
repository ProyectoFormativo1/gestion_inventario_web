import { Role } from "./role";

export class User {
    constructor(
        public fullName: string,
        public email: string,
        public role: Role
    ){}
}
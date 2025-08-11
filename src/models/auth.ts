export class AuthLogin {
    constructor(
        public email: string,
        public password: string,
    ){}
}


export class AuthRegister {
    constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public password: string
    ){}
}
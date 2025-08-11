import { AuthLogin } from "../models/auth";
import { Role } from "../models/role";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const loginApi = async (request: AuthLogin): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "fake-jwt-token",
        message: "Login exitoso",
        user: {
          userId: 12345,
          fullName: "Daniela Salgado",
          role: Role.COORDINADOR, // Ajusta según el tipo Role definido
          email: request.email,
        },
      });
    }, 1000); // Simula un retraso de 1 segundo
  });
};

export interface User {
  userId: number;
  fullName: string;
  role: Role;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface RegisterResponse extends LoginResponse {

}


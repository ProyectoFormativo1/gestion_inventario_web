import { User } from "@/models/user";
import { AuthLogin } from "../models/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const loginApi = async (request: AuthLogin): Promise<LoginResponseDto> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Error al crear el área");
  return response.json();
};

export interface LoginResponseDto {
  user: User;
  token: string;
  expiresIn: number;
}
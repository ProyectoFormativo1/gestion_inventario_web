// usePermission.ts
import { useAuth } from "./use-auth";

export const usePermission = (permiso: string) => {
  const { user } = useAuth();
  return user?.permisos.includes(permiso);
};
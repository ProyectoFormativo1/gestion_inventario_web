import { usePermission } from "@/hooks/use-permission";
import { ReactNode } from "react";

interface PermissionProps {
  permiso: string;
  children: ReactNode;
}

export function Permission({ permiso, children }: PermissionProps) {
  const allowed = usePermission(permiso);
  return allowed ? <>{children}</> : null;
}
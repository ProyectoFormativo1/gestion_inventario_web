import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './Routes';
import { useAuth } from '@/context/auth-context';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  permiso?: string;
}

const ProtectedRoute = ({ component: Component, isAuthenticated, permiso }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={routes.login} />;
  }
  if (permiso && !(user?.permisos??[]).includes(permiso)) {
    return <Navigate to={routes.unauthorized} />; // página de acceso denegado
  }
  return <Component />;
};

export default ProtectedRoute;

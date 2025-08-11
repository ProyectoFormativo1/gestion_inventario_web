import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './Routes';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ component: Component, isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={routes.login} />;
  }
  return <Component />;
};

export default ProtectedRoute;

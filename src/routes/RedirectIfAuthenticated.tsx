import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from './Routes';

interface RedirectIfAuthenticatedProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const RedirectIfAuthenticated = ({ isAuthenticated, children }: RedirectIfAuthenticatedProps) => {
  if (isAuthenticated) {
    return <Navigate to={routes.dashboard} />;
  }
  return <>{children}</>;
};

export default RedirectIfAuthenticated;

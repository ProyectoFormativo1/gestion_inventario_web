// context/auth-context.ts
import { createContext, useState, useEffect, useContext } from 'react';
import { User } from "../models/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  onLoginSuccess: (request: User, token: string) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? savedToken: null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token || ''); 
  }, [isAuthenticated, user, token]);

  const onLoginSuccess = (result: User, token : string) => {
    setUser(result);
    setToken(token);
    setIsAuthenticated(true);
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, onLoginSuccess, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

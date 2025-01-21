import React, { createContext, useState, useContext, ReactNode } from "react";

import { AuthContextType } from "@/interface/interfaces";
import { userData } from "@/interface/interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<userData | null>(null);

  const login = (userData: userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null); // Cierra sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};

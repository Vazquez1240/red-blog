import type { AuthContextType, userData } from "@/interface/interfaces";

import React, { createContext, useContext, type ReactNode } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import axios from "axios";
import ComponenteModal from "@/components/Genericos/ComponenteModal";
import { LuCircleX } from "react-icons/lu";
import { useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, status } = useSession();
  const [ openModal, setOpenModal ] = useState(false)
  const [ messageModal, setMessageModal ] = useState("")

  const login = async (userData: { email: string; password: string }) => {
    try {
      const result = await signIn("credentials", {
        ...userData,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        setOpenModal(true)
        setMessageModal("Credenciales incorrectas")
      }

    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const session = await getSession();


      if (session?.user?.refreshToken) {
        const response = await axios.post(
          "http://localhost:8000/rest/v1/logout/",
          { refresh: session.user?.refreshToken },
          {
            headers: {
              "Authorization": `Bearer ${session?.user?.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }
      await signOut({ redirect: false, callbackUrl: "/" });
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  const user: userData | null = session?.user as userData | null;

  return (
    <AuthContext.Provider value={{ user, login, logout, status }}>
      {children}

      {
        openModal && (
          <ComponenteModal
            GenericData={{
              status: true,
              type_modal: "text",
              modal_verify: false,
              isSuccesOrFail: false,
              icon: LuCircleX,
              close: () => setOpenModal(false),
            }}
            ModalData={{
              titulo: "Error",
              message: messageModal,
              textBtn: "Entendido",
              colorIcon: "text-red-500",
              function_buton: () => setOpenModal(false),
            }}
          />
        )
      }
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

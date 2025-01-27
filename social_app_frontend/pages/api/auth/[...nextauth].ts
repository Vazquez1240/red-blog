import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Añadir esto explícitamente
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos")
        }

        try {
          const response = await axios.post(
            "http://localhost:8000/rest/v1/login/",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          )

          if (response.status === 200 && response.data) {
            return {
              id: response.data.uuid,
              email: credentials.email,
              access: response.data.access,
              refresh: response.data.refresh,
              uuid: response.data.uuid,
              user_id: response.data.user_id,
              is_superuser: response.data.is_superuser,
              user_photo: response.data.user_photo,
            }
          }
          throw new Error("Error de autenticación")
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || "Error de autenticación")
          }
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.access,
          refreshToken: user.refresh,
          uuid: user.uuid,
          userId: user.user_id,
          isSuperuser: user.is_superuser,
          user_photo: user.user_photo,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          uuid: token.uuid,
          user_id: token.userId,
          is_superuser: token.isSuperuser,
          user_photo: token.user_photo,
        },
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === 'development', // Añadir para debug en desarrollo
}

export default NextAuth(authOptions)

import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "next-auth/react";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps){
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider defaultTheme="light">
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

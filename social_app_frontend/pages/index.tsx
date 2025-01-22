"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useTheme } from "next-themes";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ComponentLogin from "@/components/ComponentLogin/ComponentLogin";
import ComponenteRegistro from "@/components/ComponenteRegistro/ComponenteRegistro";
import { useAuth } from "@/context/AuthContext";

export default function IndexPage() {
  const [registro, setRegistro] = useState<boolean>(false);
  const [confeti, setConfeti] = useState(false);
  const theme = useTheme();
  const { user } = useAuth();

  const tema =
    theme.theme === "dark" ||
    (theme.theme === "system" && theme.systemTheme === "dark")
      ? "text-white"
      : "text-gray-600";

  return (
    <DefaultLayout>
      <main className="w-full h-full">
        {user !== undefined ? (
          <>
            <p>Hola</p>
          </>
        ) : (
          <>
            {confeti && (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 99,
                }}
                transition={{ duration: 0.5 }}
              >
                <Confetti
                  height={window.innerHeight}
                  numberOfPieces={600}
                  recycle={false}
                  width={window.innerWidth}
                />
              </motion.div>
            )}
            <section className="w-full h-full flex justify-center items-center">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 sm:grid-cols-1"
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center flex-col"
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p className={`text-justify ${tema}`}>
                    Social Red te brinda la libertad de conectarte, compartir y
                    expresarte sin límites. Es un espacio donde puedes ser tú
                    mismo, mantenerte cerca de las personas que importan, y
                    explorar nuevas ideas y comunidades que te inspiran. Aquí
                    tienes la oportunidad de construir relaciones, intercambiar
                    pensamientos y descubrir un mundo lleno de posibilidades,
                    todo mientras mantienes el control sobre lo que compartes y
                    cómo lo haces.
                  </p>
                </motion.div>
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Card className="h-[650px] sm:h-[580px] p-6">
                    <CardHeader className="flex flex-col content-center">
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <span className={title()}>
                          Bienvenido a{" "}
                          <span className={title({ color: "blue" })}>
                            Social red&nbsp;
                          </span>
                        </span>
                      </motion.div>
                      <span
                        className={subtitle()}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        Conéctate con amigos y el mundo que te rodea
                      </span>
                    </CardHeader>
                    <CardBody className="flex flex-col justify-center items-center">
                      {registro ? (
                        <ComponenteRegistro functionConfeti={setConfeti} />
                      ) : (
                        <ComponentLogin />
                      )}
                    </CardBody>
                    <CardFooter className="w-full flex justify-center">
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="text-center"
                        initial={{ opacity: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <Button
                          className="text-blue-500 hover:text-blue-600 transition-colors duration-200 bg-transparent"
                          onPress={() => setRegistro(!registro)}
                        >
                          {registro
                            ? "¿Ya tienes una cuenta? Inicia sesión"
                            : "¿No tienes una cuenta? Regístrate"}
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </section>
          </>
        )}
      </main>
    </DefaultLayout>
  );
}

"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { motion } from "framer-motion";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import ComponentLogin from "@/components/ComponentLogin/ComponentLogin";
import ComponenteRegistro from "@/components/ComponenteRegistro/ComponenteRegistro";

export default function IndexPage() {
  const [registro, setRegistro] = useState<boolean>(false);

  return (
    <DefaultLayout>
      <main className="w-full h-full">
        <section className="w-full h-full flex justify-center items-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 sm:grid-cols-1"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center flex-col"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-justify text-gray-600">
                Social Red te brinda la libertad de conectarte, compartir y
                expresarte sin límites. Es un espacio donde puedes ser tú mismo,
                mantenerte cerca de las personas que importan, y explorar nuevas
                ideas y comunidades que te inspiran. Aquí tienes la oportunidad
                de construir relaciones, intercambiar pensamientos y descubrir
                un mundo lleno de posibilidades, todo mientras mantienes el
                control sobre lo que compartes y cómo lo haces.
              </p>
            </motion.div>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="h-[550px] p-6">
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
                  {registro ? <ComponenteRegistro /> : <ComponentLogin />}
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
            <div />
          </motion.div>
        </section>
      </main>
    </DefaultLayout>
  );
}

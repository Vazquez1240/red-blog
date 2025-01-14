import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { LuUser, LuKeyRound } from "react-icons/lu";

import { FormDataLogin } from "@/interface/interfaces";

export default function ComponentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full flex flex-col">
      <motion.form
        animate={{ opacity: 1 }}
        className="space-y-6"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col gap-4"
          initial={{ x: -20, opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col gap-2"
            initial={{ x: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label htmlFor="email">Correo electronico</label>
            <Input
              required
              color={"primary"}
              id="email"
              placeholder={"Corre electronico"}
              startContent={
                <LuUser className={`pointer-events-none flex-shrink-0}`} />
              }
              type="email"
              variant={"bordered"}
              onChange={handleChange}
            />
          </motion.div>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label htmlFor="password">Contraseña</label>
            <Input
              required
              color={"primary"}
              id="password"
              placeholder={"********"}
              startContent={
                <LuKeyRound className={`pointer-events-none flex-shrink-0}`} />
              }
              type="password"
              variant={"bordered"}
              onChange={handleChange}
            />
            <div />
          </motion.div>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className="w-full"
            initial={{ x: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button color={"primary"} fullWidth={true}>
              Iniciar sesión
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </section>
  );
}

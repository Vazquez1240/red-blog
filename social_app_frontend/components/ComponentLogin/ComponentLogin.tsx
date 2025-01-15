import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { LuUser, LuKeyRound } from "react-icons/lu";
import { CircularProgress } from "@nextui-org/react";
import axios from "axios";

import { FormDataLogin } from "@/interface/interfaces";

export default function ComponentLogin() {
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: "",
  });
  const [submitForm, setSubmitForm] = useState(false)
  const [errors, setErrors] = useState<Partial<FormDataLogin>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name as keyof FormDataLogin]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormDataLogin> = {};

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo no es válido";
    }
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitForm(true)
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!validateForm()) {
      setSubmitForm(false)
      return;
    }
    const response = await axios.post('http://localhost:8000/rest/v1/login/', formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      })

    if (response.status === 200){
      setSubmitForm(false)
    }

  };

  return (
    <section className="w-full flex flex-col">
      <motion.form
        animate={{ opacity: 1 }}
        className="space-y-6"
        onSubmit={handleSubmit}
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
            <label htmlFor="email">Correo electrónico</label>
            <Input
              name="email"
              required
              errorMessage={errors.email}
              isInvalid={!!errors.email}
              color="primary"
              id="email"
              placeholder="Correo electrónico"
              startContent={
                <LuUser className="pointer-events-none flex-shrink-0" />
              }
              type="email"
              variant="bordered"
              value={formData.email}
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
              name="password"
              required
              color="primary"
              errorMessage={errors.password}
              isInvalid={!!errors.password}
              id="password"
              placeholder="********"
              startContent={
                <LuKeyRound className="pointer-events-none flex-shrink-0" />
              }
              type="password"
              value={formData.password}
              variant="bordered"
              onChange={handleChange}
            />
          </motion.div>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className="w-full"
            initial={{ x: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              type="submit"
              color="primary"
              isDisabled={submitForm}
              fullWidth>
              {
                submitForm ? <CircularProgress aria-label="Loading..." size="sm" /> : 'Iniciar sesión'
              }
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </section>
  );
}

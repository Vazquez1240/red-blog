import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { LuUser, LuKeyRound } from "react-icons/lu";
import { CircularProgress } from "@heroui/react";
import axios from "axios";
import { useTheme } from "next-themes";
import { UserTable } from "@/types";
import { userTable } from "@/database.config";

import { FormDataLogin } from "@/interface/interfaces";

export default function ComponentLogin() {
  const [formData, setFormData] = useState<FormDataLogin>({
    email: "",
    password: "",
  });
  const [submitForm, setSubmitForm] = useState(false);
  const [errors, setErrors] = useState<Partial<FormDataLogin>>({});
  const theme = useTheme();
  const tema =
    theme.theme === "dark" ||
    (theme.theme === "system" && theme.systemTheme === "dark")
      ? "dark"
      : "light";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

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
    setSubmitForm(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!validateForm()) {
      setSubmitForm(false);

      return;
    }
    const response: UserTable = await axios.post(
      "http://localhost:8000/rest/v1/login/",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      setSubmitForm(false);
      // userTable.add(response.data);
      const users = await userTable.toArray();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <section className="w-full flex flex-col">
      <motion.form
        animate={{ opacity: 1 }}
        className="space-y-6"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <button style={{ display: "none" }} type="submit" />
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
              required
              color={`${tema === "dark" ? "default" : "primary"}`}
              errorMessage={errors.email}
              id="email"
              isInvalid={!!errors.email}
              name="email"
              placeholder="Correo electrónico"
              startContent={
                <LuUser className="pointer-events-none flex-shrink-0" />
              }
              type="email"
              value={formData.email}
              variant="bordered"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
              color={`${tema === "dark" ? "default" : "primary"}`}
              errorMessage={errors.password}
              id="password"
              isInvalid={!!errors.password}
              name="password"
              placeholder="********"
              startContent={
                <LuKeyRound className="pointer-events-none flex-shrink-0" />
              }
              type="password"
              value={formData.password}
              variant="bordered"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </motion.div>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className="w-full"
            initial={{ x: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              fullWidth
              color={`${tema === "dark" ? "default" : "primary"}`}
              isDisabled={submitForm}
              type="submit"
            >
              {submitForm ? (
                <CircularProgress aria-label="Loading..." size="sm" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
    </section>
  );
}

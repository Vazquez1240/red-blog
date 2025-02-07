import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { LuKeyRound, LuMail, LuCircleCheck, LuCircleX } from "react-icons/lu";
import { CircularProgress } from "@heroui/react";
import axios from "axios";

import { RegistroResponse } from "@/interface/interfaces";
import ComponenteModal from "@/components/Genericos/ComponenteModal";
import { FormDataRegister } from "@/interface/interfaces";
import { useTheme } from "next-themes";

interface Props {
  functionConfeti: (val: boolean) => void;
}

export default function ComponenteRegistro({ functionConfeti }: Props) {
  const [formData, setFormData] = useState<FormDataRegister>({
    email: "",
    password: "",
    password2: "",
    username: "",
  });
  const [submitForm, setSubmitForm] = useState(false);
  const [errors, setErrors] = useState<Partial<FormDataRegister>>({});
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [modalVerify, setModalVerify] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageError, setMessageError] = useState("");
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

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name as keyof FormDataRegister]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const restStates = () => {
    setShowModal(false);
    setModalVerify(false);
    setSuccess(false);
    setUsername("");
    setMessageError("");
  };

  const validateForm = () => {
    const newErrors: Partial<FormDataRegister> = {};

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo no es válido";
    }
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }
    if (!formData.password2.trim()) {
      newErrors.password2 = "Este campo es obligatorio";
    }

    if (formData.password != formData.password2) {
      newErrors.password = "Las contraseñas no coinciden!";
      newErrors.password2 = "Las contraseñas no coinciden!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetFail = async () => {
    if (
      messageError[0] === "Ya existe un usuario con ese correo electrónico."
    ) {
      setShowModal(false);

      return;
    }
    setModalVerify(false);
    setSuccess(false);
    setMessageError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitForm(true);
    restStates();
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!validateForm()) {
      setSubmitForm(false);

      return;
    }
    try {
      const response: RegistroResponse = await axios.post(
        "http://localhost:8000/rest/v1/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        setSubmitForm(false);
        setShowModal(true);

        return;
      }
    } catch (error: any) {
      setSubmitForm(false);
      setShowModal(true);
      setModalVerify(true);
      setSuccess(false);

      if (error.response.data.email) {
        setMessageError(error.response.data.email);
      }

      return error;
    }
  };

  const PostUsername = async () => {
    functionConfeti(false);
    try {
      const response: RegistroResponse = await axios.patch(
        "http://localhost:8000/rest/v1/register/create-username/",
        {
          email: formData.email,
          username: username,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        setSubmitForm(false);
        setModalVerify(true);
        setUsername("");
        setSuccess(true);
        functionConfeti(true);

        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      setModalVerify(true);
      setSuccess(false);
      if (error.response.data.username) {
        setMessageError(error.response.data.username);
      }
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
                <LuMail className="pointer-events-none flex-shrink-0" />
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
            initial={{ x: -20, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label htmlFor="password">Confirmar contraseña</label>
            <Input
              required
              color={`${tema === "dark" ? "default" : "primary"}`}
              errorMessage={errors.password2}
              id="password"
              isInvalid={!!errors.password2}
              name="password2"
              placeholder="********"
              startContent={
                <LuKeyRound className="pointer-events-none flex-shrink-0" />
              }
              type="password"
              value={formData.password2}
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
                "Crear cuenta"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.form>
      <div>
        <ComponenteModal
          GenericData={{
            status: showModal,
            modal_verify: modalVerify,
            isSuccesOrFail: success,
            isDismissable: false,
            type_modal: "input",
            backdrop: "blur",
            inputData: username,
            setInputValue: setUsername,
            close: restStates,
          }}
          ModalData={{
            titulo: "Elige tu nombre de usuario",
            message: "Nombre de usuario",
            textBtn: "Guardar",
            function_buton: PostUsername,
          }}
          ModalFail={{
            icon: LuCircleX,
            titulo: "¡Error!",
            message: messageError,
            textBtn: "Cerrar",
            function_buton: resetFail,
          }}
          ModalSuccess={{
            icon: LuCircleCheck,
            titulo: "¡Excelente!",
            message: "Usuario creado con exito!",
            textBtn: "Cerrar",
            function_buton: () => setShowModal(false),
          }}
        />
      </div>
    </section>
  );
}

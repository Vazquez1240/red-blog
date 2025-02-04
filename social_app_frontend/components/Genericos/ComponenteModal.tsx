import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Input } from "@heroui/input";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

import {
  GenericData,
  ModalData,
  ModalSuccess,
  ModalFail,
} from "@/interface/interfaces";

interface Props {
  GenericData?: GenericData;
  ModalData?: ModalData;
  ModalSuccess?: ModalSuccess;
  ModalFail?: ModalFail;
  children?: ReactNode;
}

export default function ComponenteModal({
  GenericData = {
    status: true,
    modal_verify: false,
    isSuccesOrFail: false,
    isDismissable: false,
    type_modal: "text",
    close: () => {},
  },
  ModalData,
  ModalSuccess,
  ModalFail,
  children,
}: Props) {
  const { onOpenChange } = useDisclosure();
  const [isCompleted, setIsCompleted] = useState(false);

  const theme = useTheme();

  const tema =
    theme.theme === "dark" ||
    (theme.theme === "system" && theme.systemTheme === "dark")
      ? "dark"
      : "light";

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    GenericData.type_modal === "input"
      ? GenericData.setInputValue(e.target.value)
      : null;
  };

  const handleButtonClick = () => {
    if(ModalData?.function_buton){
      ModalData.function_buton();
    }
    setIsCompleted(true);
  };

  const handleButtonClickFail = () => {
    ModalFail?.function_buton();
  };

  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        setIsCompleted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      {GenericData.status && (
        <Modal
          backdrop={GenericData.backdrop}
          isDismissable={GenericData.isDismissable}
          isOpen={GenericData.status}
          motionProps={{
            variants: modalVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
          }}
          onOpenChange={(isOpen) => {
            if (!isOpen && GenericData?.close) GenericData.close(false);
          }}
        >
          <ModalContent>
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              {!GenericData.modal_verify ? (
                <>
                  <ModalBody>
                    {GenericData.type_modal === "input" ? (
                      <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        className="rounded-lg w-full max-w-md"
                        exit={{ scale: 0.9, opacity: 0 }}
                        initial={{ scale: 0.9, opacity: 0 }}
                      >
                        {ModalData?.titulo && (
                          <h2 className="text-2xl font-bold mb-4">
                            {ModalData.titulo}
                          </h2>
                        )}
                        <div className="flex flex-col gap-3">
                          {ModalData?.message && (
                            <label htmlFor={"username"}>
                              {ModalData.message}
                            </label>
                          )}
                          <Input
                            color={"primary"}
                            name={"username"}
                            value={GenericData.inputData}
                            variant="bordered"
                            onChange={handleOnChangeInput}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col w-full justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {GenericData.icon && ModalData?.colorIcon && (
                          <GenericData.icon
                            className={`${ModalData.colorIcon}`}
                            fontSize={55}
                          />
                        )}
                        <h2 className="text-2xl font-bold mb-2">
                          {ModalData?.titulo}
                        </h2>
                        <p
                          className={`${tema === "dark" ? "text-white" : "text-gray-500"}`}
                        >
                          {ModalData?.message}
                        </p>
                        {children}
                      </motion.div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    {ModalData?.function_buton && (
                      <Button
                        color={`${tema === "dark" ? "default" : "primary"}`}
                        onPress={handleButtonClick}
                      >
                        {ModalData.textBtn}
                      </Button>
                    )}
                  </ModalFooter>
                </>
              ) : GenericData.isSuccesOrFail ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col w-full p-4"
                  exit={{ opacity: 0, y: -20 }}
                  initial={{ opacity: 0, y: 20 }}
                >
                  <motion.div
                    animate={{ rotate: 0, scale: 1 }}
                    className="w-full flex justify-center items-center"
                    initial={{ rotate: -180, scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    {ModalSuccess !== undefined && (
                      <ModalSuccess.icon
                        className="text-green-500"
                        fontSize={55}
                      />
                    )}
                  </motion.div>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col w-full justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold mb-2">
                      {ModalSuccess?.titulo}
                    </h2>
                    <p
                      className={`${tema === "dark" ? "text-white" : "text-gray-500"}`}
                    >
                      {ModalSuccess?.message}
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col w-full p-4"
                  exit={{ opacity: 0, y: -20 }}
                  initial={{ opacity: 0, y: 20 }}
                >
                  <motion.div
                    animate={{
                      x: [-4, 4, -4, 4, 0],
                      transition: {
                        repeat: 2,
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.5,
                      },
                    }}
                    className={"w-full flex justify-center items-center"}
                  >
                    {ModalFail !== undefined && (
                      <ModalFail.icon className="text-red-500" fontSize={55} />
                    )}
                  </motion.div>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col w-full justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold mb-2">
                      {ModalFail?.titulo}
                    </h2>
                    <p
                      className={`${tema === "dark" ? "text-white" : "text-gray-500"}`}
                    >
                      {ModalFail?.message}
                    </p>
                  </motion.div>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col w-full mt-3"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Button
                      color={`${tema === "dark" ? "default" : "primary"}`}
                      onPress={handleButtonClickFail}
                    >
                      Reintentar
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
}

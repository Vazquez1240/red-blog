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

import {
  GenericData,
  ModalData,
  ModalSuccess,
  ModalFail,
} from "@/interface/interfaces";

interface Props {
  GenericData: GenericData;
  ModalData: ModalData;
  ModalSuccess: ModalSuccess;
  ModalFail: ModalFail;
}

export default function AnimatedModal({
  GenericData,
  ModalData,
  ModalSuccess,
  ModalFail,
}: Props) {
  const { onOpenChange } = useDisclosure();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    GenericData.type_modal === "input"
      ? GenericData.setInputValue(e.target.value)
      : null;
  };

  const handleButtonClick = () => {
    ModalData.function_buton();
    setIsCompleted(true);
  };

  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        setIsCompleted(false);
      }, 3000); // Reset completion state after 3 seconds

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
          isOpen={GenericData.status}
          motionProps={{
            variants: modalVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
          }}
          onOpenChange={(isOpen) => {
            if (!isOpen) GenericData.close(false);
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
                        <h2 className="text-2xl font-bold mb-4">
                          {ModalData.titulo}
                        </h2>
                        <div className="flex flex-col gap-3">
                          <label htmlFor={"username"}>
                            {ModalData.message}
                          </label>
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
                        className="p-4 text-center"
                        exit={{ opacity: 0, y: -20 }}
                        initial={{ opacity: 0, y: 20 }}
                      >
                        <GenericData.icon />
                        <h5>{ModalData.titulo}</h5>
                        <p>{ModalData.message}</p>
                      </motion.div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={handleButtonClick}>
                      {ModalData.textBtn}
                    </Button>
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
                    <ModalSuccess.icon
                      className="text-green-500"
                      fontSize={55}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col w-full justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold mb-2">
                      {ModalSuccess.titulo}
                    </h2>
                    <p className="text-gray-600">{ModalSuccess.message}</p>
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
                    <ModalFail.icon
                      className="text-red-500"
                      fontSize={55}
                    />
                  </motion.div>
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col w-full justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold mb-2">
                      {ModalFail.titulo}
                    </h2>
                    <p className="text-gray-600">{ModalFail.message}</p>
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

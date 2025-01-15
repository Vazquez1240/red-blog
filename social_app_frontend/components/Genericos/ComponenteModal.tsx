import { Modal, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/modal";

interface Props{
  text: string;
  type_input: string;
  url?: string;
  funcion?: () => void;
}

export default function ComponenteModal({text, url, funcion}: Props){
  const {isOpen=true, onOpen, onClose} = useDisclosure();

  return(
    <div className="flex flex-wrap gap-3">
      <Modal isOpen={isOpen} size={'2xl'} onClose={onClose}>
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
        <ModalBody>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
          risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
          quam.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
          risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
          quam.
        </p>
        <p>
          Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
          adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
          officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
        </p>
      </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Action
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

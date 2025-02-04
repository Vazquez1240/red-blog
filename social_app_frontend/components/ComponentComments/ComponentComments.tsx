import ComponenteModal from "@/components/Genericos/ComponenteModal";
// import { Comments } from "@/interface/interfaces";
interface Props {
  showModal: (value: boolean) => void;
}

export default function ComponentComments({ showModal }: Props) {
  const closeModal = () => {
    showModal(false);
  };

  return (
    <>
      <ComponenteModal
        GenericData={{
          status: true,
          type_modal: "text",
        }}
        ModalData={{
          textBtn: "Cerrar",
          function_buton: () => closeModal(),
        }}
      >
        <div>hola</div>
      </ComponenteModal>
    </>
  );
}

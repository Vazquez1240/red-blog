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
    <div>
      <ComponenteModal
        GenericData={{
          close: closeModal,
          status: true,
          type_modal: "text",
        }}
      >
        <div>hola</div>
      </ComponenteModal>
    </div>
  );
}

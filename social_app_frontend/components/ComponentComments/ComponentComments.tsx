import ComponenteModal from "@/components/Genericos/ComponenteModal";
// import { Comments } from "@/interface/interfaces";

interface Props {
  showModal: boolean;
}

export default function ComponentComments({ showModal }: Props) {
  return (
    <>
      <ComponenteModal>
        <div>
          hola
        </div>
      </ComponenteModal>
    </>
  )
}

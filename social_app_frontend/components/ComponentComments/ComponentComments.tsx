import ComponenteModal from "@/components/Genericos/ComponenteModal";
import { Comments } from "@/interface/interfaces";
import { Avatar } from "@heroui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";


interface Props {
  showModal: (value: boolean) => void;
  comments: Comments[];
}

export default function ComponentComments({ showModal, comments }: Props) {
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
        <div className="flex w-full flex-col gap-8 mt-8">
          {comments.map((comment, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-2 w-full justify-star hover:bg-gray-100 cursor-pointer "
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="w-8 h-8" src={comment.author_avatar} />
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{comment.author_username}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(parseISO(comment.created_at), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
                <p>{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ComponenteModal>
    </div>
  );
}

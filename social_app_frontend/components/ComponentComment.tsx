import { motion } from "framer-motion";
import { Input, Button, Avatar } from "@heroui/react";
import { useState } from "react";

import { Comment } from "@/interface/interfaces";

interface Props {
  comment: Comment[];
}

export default function ComponentComment({ comment }: Props) {
  const [Newcomments, setNewComments] = useState<Comment[]>([]);

  return (
    <>
      <motion.div
        animate={{ opacity: 1, height: "auto" }}
        className="px-4 py-2 space-y-4"
        exit={{ opacity: 0, height: 0 }}
        initial={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <form className="flex space-x-2">
          <Input
            className="flex-grow bg-t"
            color={"primary"}
            type="text"
            placeholder="Escribe un comentario..."
            // value={newComment}
            // onChange={(e) => setNewComment(e.target.value)}
            variant={"bordered"}
          />
          <Button color={"primary"} type="submit">
            Comentar
          </Button>
        </form>
        <div className="space-y-4">
          {[...Newcomments, ...comment].map((comment, index) => (
            <motion.div
              key={index}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="w-8 h-8" />
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{comment.author_username}</p>
                  <p className="text-xs text-gray-500">{comment.created_at}</p>
                </div>
                <p>{comment.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

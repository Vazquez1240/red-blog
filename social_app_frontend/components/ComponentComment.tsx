import { motion } from "framer-motion";
import { Input, Button, Avatar } from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import ComponentComments from "@/components/ComponentComments/ComponentComments";
import { useAuth } from "@/context/AuthContext";
import { Comments } from "@/interface/interfaces";

interface Props {
  comment: Comments[];
  idPost: string;
}

export default function ComponentComment({ comment, idPost }: Props) {
  const [Newcomments, setNewComments] = useState<Comments[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [showVerMas, setShowVerMas] = useState(false);
  const { user } = useAuth();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8000/rest/v1/posts/comment-post/",
        {
          id_post: idPost,
          comment_content: commentContent,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.accessToken,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        setNewComments((prevComments: any) => [
          response.data?.comment,
          ...prevComments,
        ]);
        setCommentContent("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const allComments = [...Newcomments, ...comment];
  const commentsToShow = showVerMas ? allComments : allComments.slice(0, 2);

  return (
    <>
      <motion.div
        animate={{ opacity: 1, height: "auto" }}
        className="px-4 py-2 space-y-4"
        exit={{ opacity: 0, height: 0 }}
        initial={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <form className="flex space-x-2" onSubmit={submitForm}>
          <Input
            className="flex-grow bg-t"
            color={"primary"}
            placeholder="Escribe un comentario..."
            type="text"
            variant={"bordered"}
            onKeyDown={(e) => setCommentContent(e.currentTarget.value)}
          />
          <Button color={"primary"} type="submit">
            Comentar
          </Button>
        </form>
        <div className="space-y-4">
          {[...Newcomments, ...comment].map(
            (comment, index) =>
              index < 2 && (
                <motion.div
                  key={index}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-2"
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
              ),
          )}
          {allComments.length > 2 && (
            <Button
              className={"w-full"}
              variant={"light"}
              onPress={() => setShowVerMas(true)}
            >
              Ver más comentarios
            </Button>
          )}
          {showVerMas && <ComponentComments showModal={setShowVerMas} />}
        </div>
      </motion.div>
    </>
  );
}

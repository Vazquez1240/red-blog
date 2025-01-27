import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import { Avatar } from "@heroui/avatar";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuMessageCircle, LuShare2 } from "react-icons/lu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

import { ResultsPosts } from "@/interface/interfaces";
import { useEffect } from "react";

export default function ComponentPosts({
                                         title,
                                         author_username,
                                         author_photo,
                                         author_uuid,
                                         author_email,
                                         content,
                                         likes,
                                         comments,
                                         id
                                       }: ResultsPosts) {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(likes.length);
  
  useEffect(() => {
    setLikesCount(likes.length);
    likes.includes(user?.uuid as string) ? setLiked(true) : setLiked(false);
  }, [likes, user]);

  const likePost = async () => {
    const response = await axios.patch('http://localhost:8000/rest/v1/posts/like-post/', {
      id_post: id
    }, {
      headers: {
        Authorization: "Bearer " + user?.accessToken,
      },
    });

    if (response.data?.estado === "remove") {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  return (
    <>
      <Card
        className={"flex w-full sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]"}
      >
        <CardHeader>
          <div className={"flex flex-row gap-3 w-full"}>
            <Avatar
              src={
                author_photo === null
                  ? "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"
                  : author_photo
              }
            />
            <div>
              <p style={{ fontSize: "14px" }}>{author_username}</p>
              <p style={{ fontSize: "14px" }}>hace 2 horas</p>
            </div>
          </div>
          <div className={"w-full flex justify-end mr-3 mt-[-24px]"}>
            <p>...</p>
          </div>
        </CardHeader>
        <CardBody>
          <p className={"text-black"}>{content}</p>
        </CardBody>
        <CardFooter>
          <div className={"w-full flex flex-row justify-between"}>
            <div>
              <Button variant={"light"} onPress={likePost}>
                {liked ? (
                  <motion.div
                    key="filledHeart"
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    initial={{ scale: 0, rotate: -180 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <FaHeart className="h-4 w-4 text-red-500 cursor-pointer" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="outlineHeart"
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    initial={{ scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <FaRegHeart className="h-4 w-4 cursor-pointer" />
                  </motion.div>
                )}
                {likesCount} Me gusta
              </Button>
            </div>
            <div>
              <Button variant={"light"}>
                <LuMessageCircle />
                {comments.length} Comentarios
              </Button>
            </div>
            <div>
              <Button variant={"light"}>
                <LuShare2 />
                {comments.length} Compartir
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

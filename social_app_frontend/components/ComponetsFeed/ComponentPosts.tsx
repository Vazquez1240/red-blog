import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import { Avatar } from "@heroui/avatar";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuMessageCircle, LuShare2, LuChevronUp, LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useEffect, useRef } from "react";

import { useAuth } from "@/context/AuthContext";
import { ResultsPosts } from "@/interface/interfaces";

export default function ComponentPosts({
  title,
  author_username,
  author_photo,
  author_uuid,
  author_email,
  content,
  likes,
  comments,
  id,
}: ResultsPosts) {
  const [liked, setLiked] = useState(false);
  const [ isExpanded, setIsExpanded ] = useState(false);
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(likes.length);
  const contentRef = useRef<HTMLParagraphElement>(null)
  const [shouldTruncate, setShouldTruncate] = useState(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)

  useEffect(() => {
    setLikesCount(likes.length);
    likes.includes(user?.uuid as string) ? setLiked(true) : setLiked(false);
  }, [likes, user]);

  useEffect(() => {
    const checkTruncate = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current
        setShouldTruncate(scrollHeight > clientHeight)
      }
    }

    checkTruncate()
    window.addEventListener("resize", checkTruncate)
    return () => window.removeEventListener("resize", checkTruncate)
  }, [content])

  const likePost = async () => {
    const response = await axios.patch(
      "http://localhost:8000/rest/v1/posts/like-post/",
      {
        id_post: id,
      },
      {
        headers: {
          Authorization: "Bearer " + user?.accessToken,
        },
      },
    );

    if (response.data?.estado === "remove") {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
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
          <motion.div
            animate={{ height: isExpanded || !shouldTruncate ? "auto" : "3.4em" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-hidden"
          >
            <p ref={contentRef} className={`${isExpanded ? "" : "line-clamp-2"}`}>
              {content}
            </p>
            {shouldTruncate && !isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
            )}
          </motion.div>
          <AnimatePresence>
            {shouldTruncate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2"
              >
                <Button
                  variant="light"
                  size="sm"
                  onClick={toggleExpand}
                  className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`post-content-${id}`}
                >
                  {isExpanded ? (
                    <>
                      <LuChevronUp className="mr-1 h-4 w-4" />
                      Ver menos
                    </>
                  ) : (
                    <>
                      <LuChevronDown className="mr-1 h-4 w-4" />
                      Ver más
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
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

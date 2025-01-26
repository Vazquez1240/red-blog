import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import { Avatar } from "@heroui/avatar";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
}: ResultsPosts) {
  const [liked, setLiked] = useState(false);

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
          <div>
            <div>
              <Button variant={"light"} onPress={() => setLiked(!liked)}>
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
                {likes} Me gusta
              </Button>
            </div>
            <div />
            <div />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

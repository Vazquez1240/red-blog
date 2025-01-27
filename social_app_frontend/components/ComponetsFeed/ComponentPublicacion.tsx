import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

interface Props {
  setNewPosts: (posts: any) => void;
}

export default function ComponentPublicacion({ setNewPosts }: Props) {
  const [messagePublicacion, setMessagePublicacion] = useState("");

  const { user } = useAuth()

  console.log(user?.user_photo)

  const sendPosts = async (e: React.FormEvent) => {
    e.preventDefault()
    const session = await getSession();

    if (session?.user?.uuid) {
      try {
        const response = await axios.post(
          "http://localhost:8000/rest/v1/posts/",
          {
            title: "New Post",
            content: messagePublicacion,
            author_uuid: session.user.uuid,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 201) {
          const newPost = response.data;

          setNewPosts((prevPosts: any) => [newPost, ...prevPosts]);
          setMessagePublicacion("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>

      <form onSubmit={sendPosts}>
        <Card
          className={
            "flex flex-row w-full sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]"
          }
        >
          <CardBody className={"flex flex-row gap-3 justify-center items-center"}>
            <div>
              <Avatar src={
                user?.user_photo === null
                  ? "https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png"
                  : user?.user_photo
              } />
            </div>
            <Input
              isRequired
              labelPlacement="outside"
              placeholder="¿Qué estás pensando?"
              type="text"
              color={"primary"}
              value={messagePublicacion}
              variant="bordered"
              onChange={(e) => setMessagePublicacion(e.target.value)}
              onKeyDown={(e) => console.log("hola")}
            />
            <Button color={"primary"} type="submit">
              Publicar
            </Button>
          </CardBody>
        </Card>
      </form>
    </>
  );
}

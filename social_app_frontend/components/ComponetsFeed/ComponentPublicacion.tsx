import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

interface Props {
  setNewPosts: (posts: any) => void;
}

export default function ComponentPublicacion({ setNewPosts }: Props) {
  const [messagePublicacion, setMessagePublicacion] = useState("");

  const sendPsts = async () => {
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
      <Card
        className={
          "flex flex-row w-full sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]"
        }
      >
        <CardBody className={"flex flex-row gap-3 justify-center items-center"}>
          <div>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </div>
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="¿Qué estás pensando?"
            type="text"
            value={messagePublicacion}
            variant="bordered"
            onChange={(e) => setMessagePublicacion(e.target.value)}
            onKeyDown={(e) => console.log("hola")}
          />
          <Button color={"primary"} onPress={sendPsts}>
            Publicar
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { useMount } from "@reactuses/core";
import { Posts } from "@/interface/interfaces";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function ComponentFeed() {

  const { user } = useAuth()


  useMount( async () => {
    const response = await axios.get('http://localhost:8000/rest/v1/posts/', {
      headers: {
        'Authorization': 'Bearer ' + user?.access,
      }
    })
    console.log(response.data, 'response')
  });

  return (
    <main className={"flex flex-col gap-8"}>
      <section className={"flex flex-col w-full"}>
        <Card className={"flex flex-row w-[65%]"}>
          <CardBody className={"flex flex-row gap-3 justify-center items-center"}>
            <div>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d"/>
            </div>
            <Input type={"text"} variant={"bordered"} placeholder={"¿Que estas pensando?"}/>
            <Button> Publicar </Button>
          </CardBody>
        </Card>
      </section>
      <section>

      </section>
    </main>
  )
}

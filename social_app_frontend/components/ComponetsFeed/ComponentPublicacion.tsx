import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import {Button, Input} from "@heroui/react";
import { useState } from "react";


export default function ComponentPublicacion() {
  const [ messagePublicacion, setMessagePublicacion ] = useState("")

  return (
    <>
      <Card className={"flex flex-row w-full sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]"}>
        <CardBody className={"flex flex-row gap-3 justify-center items-center"}>
          <div>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d"/>
          </div>
          <Input
            type="text"
            isRequired
            labelPlacement="outside"
            variant="bordered"
            placeholder="¿Qué estás pensando?"
            value={messagePublicacion}
            onChange={(e) => setMessagePublicacion(e.target.value)}
            onKeyDown={(e) => console.log('hola')}
          />
          <Button color={"primary"}> Publicar </Button>
        </CardBody>
      </Card>
    </>
  )
}

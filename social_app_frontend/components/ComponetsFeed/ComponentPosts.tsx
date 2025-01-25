import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button, Input } from "@heroui/react";


export default function ComponentPosts() {
  return (
    <>
      <Card className={"flex flex-row w-full sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]"}>
        <CardHeader className={"flex flex-row gap-3 items-center"}>
          <div className={"flex flex-row gap-3 w-full"}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <div>
              <p style={{fontSize: "14px"}}>usuario1</p>
              <p style={{fontSize: "14px"}}>hace 2 horas</p>
            </div>
          </div>
          <div className={"w-full flex justify-end mr-3 mt-[-24px]"}>
            <p>...</p>
          </div>
        </CardHeader>
        <CardBody className={"flex flex-row gap-3 justify-center items-center"}>

        <Input
            type="text"
            isRequired
            labelPlacement="outside"
            variant="bordered"
            placeholder="¿Qué estás pensando?"
            onKeyDown={(e) => console.log('hola')}
          />
          <Button color={"primary"}> Publicar </Button>
        </CardBody>
      </Card>
    </>
  )
}

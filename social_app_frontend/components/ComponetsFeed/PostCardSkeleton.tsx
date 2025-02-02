import { Card, CardBody, CardFooter, CardHeader, Skeleton } from "@heroui/react"

export default function PostCardSkeleton() {
  return (
    <Card className="w-full sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardBody className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardBody>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
      </CardFooter>
    </Card>
  )
}

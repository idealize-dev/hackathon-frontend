import { Button } from "@/components/ui/button";

export function TaskItem() {
  return (
    <div className="border flex flex-col bg-white p-4 rounded-lg gap-4">
      <h2 className="font-bold text-lg">
        John wants to cancel his subcription
      </h2>
      <p className="text-gray-500">
        John subscribed for a week but his account wasn't working. He wants to
        cancel it and is asking for a refund.
      </p>

      {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Not started</SelectItem>
            <SelectItem value="dark">In progress</SelectItem>
            <SelectItem value="system">Complete</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div> */}
      <Button className="w-fit">View</Button>
    </div>
  );
}

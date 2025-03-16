import { Button } from "@/components/ui/button";
import { Task } from "@/lib/definitions";
import { useDrag, DragSourceMonitor } from "react-dnd";

export function TaskItem({ task }: { task: Task }) {
  const [{ isDragging }, drag] = useDrag<Task, void, { isDragging: boolean }>({
    type: "TASK",
    item: {
      id: task.id,
      status: task.status,
      title: task.title,
      description: task.description,
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="border flex flex-col bg-white p-4 rounded-lg gap-4">
        <h2 className="font-bold text-lg">{task.title}</h2>
        <p className="text-gray-500">{task.description}</p>
        <Button className="w-fit">View</Button>
      </div>
    </div>
  );
}

import { Task } from "@/lib/definitions";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { TaskItem } from "./task-item";

interface StatusColumnProps {
  status: Task["status"];
  title: string;
  tasks: Task[];
  color: string;
  onDropTask: (id: number, newStatus: Task["status"]) => void;
}

export function StatusColumn({
  status,
  title,
  tasks,
  color,
  onDropTask,
}: StatusColumnProps) {
  const [, drop] = useDrop<Task, void, unknown>({
    accept: "TASK",
    drop: (item: Task, monitor: DropTargetMonitor) => {
      if (item.status !== status) {
        onDropTask(item.id, status);
      }
    },
  });

  return (
    <div
      ref={drop}
      className={`h-full w-full overflow-y-scroll p-4 rounded-lg border border-gray-200 ${color}`}
    >
      <h1 className="text-lg font-bold pb-4">{title}</h1>
      <div
        className={
          tasks.length == 0
            ? "flex items-center justify-center h-full"
            : "flex flex-col gap-4"
        }
      >
        {tasks.length == 0 ? (
          <p>Empty</p>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

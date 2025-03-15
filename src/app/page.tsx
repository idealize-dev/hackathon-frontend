"use client";

import { useState } from "react";
import {
  DndProvider,
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FilterGroup from "@/components/filter-group";
import { TaskItem } from "@/components/task-item";

interface Task {
  id: number;
  text: string;
  status: "not_started" | "in_progress" | "completed";
}

interface DragItem {
  id: number;
  status: Task["status"];
}

interface DraggableTaskItemProps {
  task: Task;
}

function DraggableTaskItem({ task }: DraggableTaskItemProps) {
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TaskItem task={task} />
    </div>
  );
}

interface DroppableColumnProps {
  status: Task["status"];
  title: string;
  tasks: Task[];
  color: string;
  onDropTask: (id: number, newStatus: Task["status"]) => void;
}

function DroppableColumn({
  status,
  title,
  tasks,
  color,
  onDropTask,
}: DroppableColumnProps) {
  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: "TASK",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
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
          tasks.map((task) => <DraggableTaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Task 1", status: "not_started" },
    { id: 2, text: "Task 2", status: "not_started" },
    { id: 3, text: "Task 3", status: "not_started" },
    { id: 4, text: "Task 4", status: "in_progress" },
    { id: 5, text: "Task 5", status: "in_progress" },
    { id: 6, text: "Task 6", status: "completed" },
  ]);

  const moveTask = (id: number, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen p-8 gap-8">
        {/* Filters */}
        <div className="flex flex-col w-1/6 gap-8">
          <FilterGroup
            title="Categories"
            subtitle="These are your categories"
            buttonText="Add a category"
          />
          <FilterGroup
            title="People"
            subtitle="There are your people"
            buttonText="Add a person"
          />
        </div>
        {/* Task columns */}
        <div className="flex gap-8 w-5/6 bg-gray-50 border border-gray-200 rounded-lg p-8">
          <DroppableColumn
            status="not_started"
            title="📝 Not started"
            tasks={tasks.filter((task) => task.status === "not_started")}
            color="bg-gray-50"
            onDropTask={moveTask}
          />
          <DroppableColumn
            status="in_progress"
            title="⏳ In progress"
            tasks={tasks.filter((task) => task.status === "in_progress")}
            color="bg-blue-50"
            onDropTask={moveTask}
          />
          <DroppableColumn
            status="completed"
            title="✅ Completed"
            tasks={tasks.filter((task) => task.status === "completed")}
            color="bg-green-50"
            onDropTask={moveTask}
          />
        </div>
      </div>
    </DndProvider>
  );
}

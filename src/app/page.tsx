"use client";

import { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FilterGroup from "@/components/category-filter";
import { Category, Person, Task } from "@/lib/definitions";
import { StatusColumn } from "@/components/status-column";
import { createClient } from "@/utils/supabase/client";
import CategoryFilter from "@/components/category-filter";
import PeopleFilter from "@/components/people-filter";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data, error } = await supabase.from("categories").select("*");
      const categories: Category[] =
        data?.map((category) => {
          return {
            id: category.id,
            name: category.name,
            isSelected: true,
          };
        }) ?? [];
      setCategories(categories);
    }

    async function fetchPeople() {}

    fetchCategories();
  }, []);

  console.log(categories);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Task 1",
      description: "This is a description",
      status: "not_started",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is a description",
      status: "not_started",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is a description",
      status: "not_started",
    },
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
          <CategoryFilter
            title="Categories"
            subtitle="These are your categories"
            buttonText="Add a category"
            items={categories}
          />
          <PeopleFilter
            title="People"
            subtitle="These are your people"
            buttonText="Add a category"
            items={people}
          />
        </div>
        {/* Task columns */}
        <div className="flex gap-8 w-5/6 bg-gray-50 border border-gray-200 rounded-lg p-8">
          <StatusColumn
            status="not_started"
            title="📝 Not started"
            tasks={tasks.filter((task) => task.status === "not_started")}
            color="bg-gray-50"
            onDropTask={moveTask}
          />
          <StatusColumn
            status="in_progress"
            title="⏳ In progress"
            tasks={tasks.filter((task) => task.status === "in_progress")}
            color="bg-blue-50"
            onDropTask={moveTask}
          />
          <StatusColumn
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

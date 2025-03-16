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
  const supabase = createClient();

  const [categories, setCategories] = useState<Category[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("categories").select("*");
      const categories: Category[] =
        data?.map((category) => {
          return {
            id: category.id,
            name: category.name!,
            isSelected: true,
          };
        }) ?? [];
      setCategories(categories);
    }

    async function fetchPeople() {
      const { data, error } = await supabase.from("people").select("*");
      const people: Person[] =
        data?.map((person) => {
          return {
            id: person.id,
            name: person.name!,
            isSelected: true,
          };
        }) ?? [];
      setPeople(people);
    }

    async function fetchTasks() {
      const { data, error } = await supabase.from("classified_emails").select("*, email_categories(category_id(*, category_in_charge(person_id(*))))");
      const taskData:Task[] = data?.map((task) => {
        return {
          id : task.id,
          title: task.title!,
          description: task.description!,
          status: "not_started",
          categories : task.email_categories.map((category) => {
            return {
              id : category.category_id!.id,
              name : category.category_id!.name!,
              description : category.category_id!.description!,
              inCharge : category.category_id!.category_in_charge.map((inCharge) => {
                return {
                  id : inCharge.person_id!.id,
                  name : inCharge.person_id!.name!
                }
              })
            }
          })
        }
      }) ?? [];
      setTasks(taskData);
      setFilteredTasks(taskData);
    }

    fetchCategories();
    fetchPeople();
    fetchTasks();
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const moveTask = (id: number, newStatus: Task["status"]) => {
    setFilteredTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const onPeopleFilterChange = (personId: number) => {
    // Update the people list
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === personId
          ? { ...person, isSelected: !person.isSelected }
          : person
      )
    );

    // Get the updated list of selected people after the change
    const updatedPeople = people.map((person) =>
      person.id === personId
        ? { ...person, isSelected: !person.isSelected }
        : person
    );

    const selectedPeople = updatedPeople
      .filter((person) => person.isSelected)
      .map((person) => person.id);

    // Update the filteredTasks list
    setFilteredTasks(() =>
      tasks.filter((task) =>
        task.categories.some((category) =>
          category.inCharge.some((person) => selectedPeople.includes(person.id))
        )
      )
    );
  }

  const onCategoryFilterChange = (categoryId: number) => {
    // Update the categories list
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, isSelected: !category.isSelected }
          : category
      )
    );
  
    // Get the updated list of selected categories after the change
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? { ...category, isSelected: !category.isSelected }
        : category
    );
  
    const selectedCategories = updatedCategories
      .filter((category) => category.isSelected)
      .map((category) => category.id);
  
    // Update the filteredTasks list
    setFilteredTasks(() =>
      tasks.filter((task) =>
        task.categories.some((category) => selectedCategories.includes(category.id))
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
            onCategoryChange={onCategoryFilterChange}
          />
          <PeopleFilter
            title="People"
            subtitle="These are your people"
            buttonText="Add a category"
            items={people}
            onPersonChange={onPeopleFilterChange}
          />
        </div>
        {/* Task columns */}
        <div className="flex gap-8 w-5/6 bg-gray-50 border border-gray-200 rounded-lg p-8">
          <StatusColumn
            status="not_started"
            title="📝 Not started"
            tasks={filteredTasks.filter((task) => task.status === "not_started")}
            color="bg-gray-50"
            onDropTask={moveTask}
          />
          <StatusColumn
            status="in_progress"
            title="⏳ In progress"
            tasks={filteredTasks.filter((task) => task.status === "in_progress")}
            color="bg-blue-50"
            onDropTask={moveTask}
          />
          <StatusColumn
            status="completed"
            title="✅ Completed"
            tasks={filteredTasks.filter((task) => task.status === "completed")}
            color="bg-green-50"
            onDropTask={moveTask}
          />
        </div>
      </div>
    </DndProvider>
  );
}

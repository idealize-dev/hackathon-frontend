export interface Task {
  id: number;
  title: string;
  description: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface Category {
  id: number;
  name: string;
  isSelected: boolean;
}

export interface Person {
  id: number;
  name: string;
  isSelected: boolean;
}

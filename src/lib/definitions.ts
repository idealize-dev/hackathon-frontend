export interface Task {
  id: number;
  title: string;
  description: string;
  status: "not_started" | "in_progress" | "completed";
  categories : TaskCategory[];
}

export interface TaskCategory {
  id: number;
  name : string;
  description : string;
  inCharge : CategoryInCharge[];
}

export interface CategoryInCharge {
  id : number;
  name : string;
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

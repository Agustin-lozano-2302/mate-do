import { ITodo } from "@/interface/Todo-interface";

import { UserMetadata } from "@supabase/supabase-js";

export type TodosProps = {
  user: UserMetadata;
};

export type Category = "Personal" | "Trabajo" | "Estudio" | "Hogar";

export interface ITodoListProps {
  todos: ITodo[];
  toggleTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
  setSelectedTodo: (todo: ITodo) => void;
  setIsViewModalOpen: (isOpen: boolean) => void;
}

export interface ITodoItemProps {
  todo: ITodo;
  toggleTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
  setSelectedTodo: (todo: ITodo) => void;
  setIsViewModalOpen: (isOpen: boolean) => void;
}

export interface ITodoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  newTodo: { title: string; description: string; category: Category };
  setNewTodo: (todo: {
    title: string;
    description: string;
    category: Category;
  }) => void;
  addTodo: (e: React.FormEvent) => void;
}

export interface ITodoDetailsModalProps {
  isViewModalOpen: boolean;
  setIsViewModalOpen: (isOpen: boolean) => void;
  selectedTodo: ITodo;
}

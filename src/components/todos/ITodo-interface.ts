import { ITodo } from "@/interface/Todo-interface";

import { UserMetadata } from "@supabase/supabase-js";

export type TodosProps = {
  user: UserMetadata;
};

export type Category = "personal" | "work" | "study" | "home";

export interface ITodoListProps {
  todos: ITodo[];
  toggleTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
  setSelectedTodo: (todo: ITodo) => void;
  setIsViewModalOpen: (isOpen: boolean) => void;
  openEditModal: (todo: ITodo) => void
}

export interface ITodoItemProps {
  todo: ITodo;
  toggleTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
  setSelectedTodo: (todo: ITodo) => void;
  setIsViewModalOpen: (isOpen: boolean) => void;
}

export interface ITodoModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  newTodo: { title: string; description: string; category: Category; due_date: string };
  setNewTodo: (todo: {
    title: string;
    description: string;
    category: Category;
    due_date: string;
  }) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isEditing: boolean;
}

export interface ITodoDetailsModalProps {
  isViewModalOpen: boolean;
  setIsViewModalOpen: (isOpen: boolean) => void;
  selectedTodo: ITodo;
}

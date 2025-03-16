import { supabase } from "@/context/supabase";
import { ITodo } from "@/interface/Todo-interface";
import { UserMetadata } from "@supabase/supabase-js";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import TodoModal from "./sections/todoModal";
import TodoDetailsModal from "./sections/todoDetailsModal";
import TodoList from "./sections/todoList";
import EmpthyState from "./sections/empthyState";

type TodosProps = {
  user: UserMetadata;
};

type Category = "Personal" | "Trabajo" | "Estudio" | "Hogar";

export default function Todos({ user }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    category: "" as Category,
    due_date: "" 
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isEditing && selectedTodo) {
      const { error } = await supabase
        .from("todos")
        .update({
          task: newTodo.title,
          description: newTodo.description,
          category: newTodo.category,
          due_date: newTodo.due_date
        })
        .eq("id", selectedTodo.id);
  
      if (!error) {
        getTodos();
        setIsEditing(false);
        setSelectedTodo(null);
      }
    } else {
      const { error } = await supabase
        .from("todos")
        .insert([{ 
          task: newTodo.title,
          description: newTodo.description,
          category: newTodo.category,
          due_date: newTodo.due_date,
          user_id: user.id 
        }]);
  
      if (!error) {
        getTodos();
      }
    }
  
    setNewTodo({ title: "", description: "", category: "" as Category, due_date: "" });
    setIsModalOpen(false);
  };
  

  const toggleTodo = async (todo: ITodo) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ is_completed: todo.is_completed == true ? false : true })
      .eq("id", todo.id)
      .select();

    getTodos();
  };

  const deleteTodo = async (todo: ITodo) => {
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);
    getTodos();
  };

  const getTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);

    if (todos) {
      setTodos(todos);
    }
  };
  const openEditModal = (todo: ITodo) => {
    setSelectedTodo(todo);
    setNewTodo({
      title: todo.task,
      description: todo.description,
      category: todo.category as Category,
      due_date: todo.due_date
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center px-6 py-8 relative ">
      <h1 className="text-2xl font-bold mb-6 text-black">Mis Tareas</h1>
      <div className="w-full max-w-md mx-auto">
        {todos && todos.length > 0 ? (
          <TodoList
            setSelectedTodo={setSelectedTodo}
            setIsViewModalOpen={setIsViewModalOpen}
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            openEditModal={openEditModal}
          />
        ) : (
          <EmpthyState />
        )}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <Plus size={24} />
      </button>
      {isViewModalOpen && selectedTodo && (
        <TodoDetailsModal
          isViewModalOpen={isViewModalOpen}
          selectedTodo={selectedTodo}
          setIsViewModalOpen={setIsViewModalOpen}
        />
      )}
      {isModalOpen && (
        <TodoModal
          setIsModalOpen={setIsModalOpen}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          onSubmit={handleSubmit}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

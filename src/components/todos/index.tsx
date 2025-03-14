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
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    category: "" as Category
  });


  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.id !== "") {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ 
          task: newTodo.title,
          description: newTodo.description,
          category: newTodo.category,
          user_id: user.id 
        }])
        .select();

      if (!error) {
        getTodos();
        setNewTodo({
          title: "",
          description: "",
          category: "" as Category
        });
        setIsModalOpen(false);
      }
    }
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

 

 
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center px-6 py-8 relative ">
      <h1 className="text-2xl font-bold mb-6 text-black">Mis Tareas</h1>
      <div className="w-full max-w-md mx-auto">
        {todos && todos.length > 0 ? (
        <TodoList setSelectedTodo={setSelectedTodo} setIsViewModalOpen={setIsViewModalOpen}  todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
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
        <TodoDetailsModal isViewModalOpen={isViewModalOpen} selectedTodo={selectedTodo} setIsViewModalOpen={setIsModalOpen} />
      )}
      {isModalOpen && (
      <TodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo}  />
      )}
    </div>
  );
}

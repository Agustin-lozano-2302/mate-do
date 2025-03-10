import { supabase } from "@/context/supabase";
import { ITodo } from "@/interface/Todo-interface";
import { UserMetadata } from "@supabase/supabase-js";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type TodosProps = {
  user: UserMetadata;
};

export default function Todos({ user }: TodosProps) {
  const mockTodos = [
    { id: 1, task: "Completar el proyecto", is_complete: false },
    { id: 2, task: "Hacer ejercicio", is_complete: true },
    { id: 3, task: "Leer un libro", is_complete: false },
  ];

  const [todos, setTodos] = useState<ITodo[]>();
  const [newTask, setNewTask] = useState("");

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user.id);
    if (user.id !== "") {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ task: newTask, user_id: user.id}])
        .select();
      
      if (!error) {
        getTodos();
        setNewTask("");
      }
    }
  
  };

  const toggleTodo = async (todo:ITodo) => {
   
const { data, error } = await supabase
.from('todos')
.update({ is_completed: todo.is_completed == true ? false : true })
.eq('id', todo.id)
.select()

getTodos()
        
  };

  const deleteTodo = async (todo: ITodo) => {

    const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todo.id)

    getTodos()
            
  };

  const getTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq('user_id', user.id);

    if (todos) {
      setTodos(todos);
    }
  };

  useEffect(() => {
    getTodos();
    console.log(user);
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Mis Tareas</h1>

      {/* Lista de Tareas */}
      <div className="w-full max-w-md mx-auto">
        {/* Formulario para agregar tarea */}
        <form onSubmit={addTodo} className="flex items-center mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Agregar nueva tarea..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Plus size={24} />
          </button>
        </form>

        {/* Lista de tareas */}
        <ul className="space-y-2">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.is_completed}
                  onChange={() => toggleTodo(todo)}
                  className="mr-3 form-checkbox h-5 w-5 text-green-600"
                />
                <span
                  className={`${
                    todo.is_completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {todo.task}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

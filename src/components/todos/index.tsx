import { supabase } from "@/context/supabase";
import { ITodo } from "@/interface/Todo-interface";
import { UserMetadata } from "@supabase/supabase-js";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

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

  const categories: Category[] = ["Personal", "Trabajo", "Estudio", "Hogar"];

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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const openViewModal = (todo: ITodo, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('input')) {
      setSelectedTodo(todo);
      setIsViewModalOpen(true);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center px-6 py-8 relative">
      <h1 className="text-2xl font-bold mb-6 text-black">Mis Tareas</h1>
      <div className="w-full max-w-md mx-auto">
        {/* Lista de tareas */}
        {todos && todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50"
                onClick={(e) => openViewModal(todo, e)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.is_completed}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleTodo(todo);
                      }}
                      className="mr-3 form-checkbox h-5 w-5 text-green-600"
                    />
                    <span
                      className={`${
                        todo.is_completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {truncateText(todo.task, 30)}
                    </span>
                  </div>
                  {todo.description && (
                    <p className="text-sm text-gray-500 ml-8">{truncateText(todo.description, 50)}</p>
                  )}
                  {todo.category && (
                    <span className="ml-8 mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {todo.category}
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay tareas pendientes</h3>
            <p className="text-gray-500">¡Comienza agregando una nueva tarea!</p>
          </div>
        )}
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <Plus size={24} />
      </button>

      {/* Modal de Vista */}
      {isViewModalOpen && selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Detalles de la Tarea</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-green-600">Título</h3>
                <p className="mt-1 text-lg h-8 overflow-x-auto whitespace-nowrap">{selectedTodo.task}</p>
              </div>
              {selectedTodo.description && (
                <div>
                  <h3 className="text-sm font-medium text-green-600">Descripción</h3>
                  <p className="mt-1 max-w-full h-24 overflow-y-auto break-words">{selectedTodo.description}</p>
                </div>
              )}
              {selectedTodo.category && (
                <div>
                  <h3 className="text-sm font-medium text-green-600">Categoría</h3>
                  <span className="mt-1 inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {selectedTodo.category}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-green-600">Estado</h3>
                <p className="mt-1">
                  {selectedTodo.is_completed ? "Completada" : "Pendiente"}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Nueva Tarea */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>
            <form onSubmit={addTodo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  maxLength={30}
                  required
                />
                <span className="text-xs text-gray-500">{newTodo.title.length}/30 caracteres</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  maxLength={50}
                />
                <span className="text-xs text-gray-500">{newTodo.description.length}/50 caracteres</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={newTodo.category}
                  onChange={(e) => setNewTodo({...newTodo, category: e.target.value as Category})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

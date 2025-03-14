import { Category, ITodoModalProps } from "@/components/todos/ITodo-interface";
import { categories } from "@/constants/categories";
import { ChevronDown } from "lucide-react";

export default function TodoModal({ isModalOpen, setIsModalOpen, newTodo, setNewTodo, addTodo }: ITodoModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Nueva Tarea</h2>
        <form onSubmit={addTodo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={newTodo.description}
              onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              rows={3}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <div className="relative">
              <select
                value={newTodo.category}
                onChange={(e) => setNewTodo({...newTodo, category: e.target.value as Category})}
                className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-black"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
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
    );
  }
  
  
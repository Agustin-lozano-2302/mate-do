import { ITodoDetailsModalProps } from "@/components/todos/ITodo-interface";

export default function TodoDetailsModal({  setIsViewModalOpen, selectedTodo }: ITodoDetailsModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
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
                <div >
                  <h3 className="text-sm font-medium text-green-600">Categoría</h3>
                  <span className="mt-1 inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {selectedTodo.category}
                  </span>
                </div>
              )}
              <div >
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
    );
  }
  
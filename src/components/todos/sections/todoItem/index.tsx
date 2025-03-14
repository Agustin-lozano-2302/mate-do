import { Trash2 } from "lucide-react";
import { ITodoItemProps } from "@/components/todos/ITodo-interface";
export default function TodoItem({ todo, toggleTodo, deleteTodo, setSelectedTodo, setIsViewModalOpen }: ITodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50" onClick={() => { setSelectedTodo(todo); setIsViewModalOpen(true); }}>
      <div className="flex flex-col">
        <div className="flex items-center">
          <input type="checkbox" checked={todo.is_completed} onChange={(e) => { e.stopPropagation(); toggleTodo(todo); }} className="mr-3 form-checkbox h-5 w-5 text-green-600" />
          <span className={`${todo.is_completed ? "line-through text-gray-400" : "text-gray-700"}`}>{todo.task}</span>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo); }} className="text-red-500 hover:text-red-700">
        <Trash2 size={20} />
      </button>
    </li>
  );
}
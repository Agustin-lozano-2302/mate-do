import { Category, ITodoListProps } from "@/components/todos/ITodo-interface";
import TodoItem from "@/components/todos/sections/todoItem";
import { ITodo } from "@/interface/Todo-interface";
import { Trash2 } from "lucide-react";

export default function TodoList({ todos, toggleTodo, deleteTodo, setSelectedTodo, setIsViewModalOpen,openEditModal }: ITodoListProps) {


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


  const getCategoryStyle = (category: Category) => {
    switch (category) {
      case "personal":
        return "bg-blue-100 text-blue-800";
      case "work":
        return "bg-red-100 text-red-800";
      case "study":
        return "bg-yellow-100 text-yellow-800";
      case "home":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
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
                  : "text-gray-700 font-semibold"
              }`}
            >
              {truncateText(todo.task, 30)}
            </span>
          </div>
          {todo.description && (
            <p className="text-sm text-gray-500 ml-8">{truncateText(todo.description, 50)}</p>
          )}
          {todo.category && (
            <span className={`w-fit ml-8 mt-1 text-xs ${getCategoryStyle(todo.category as Category)} px-2 py-1 rounded-full `} >
              {todo.category as Category}
            </span>
          )}
          {todo.due_date && (
  <span className="text-sm text-gray-500 ml-8 mt-1 ">
    📅 {new Date(todo.due_date).toLocaleString()}
  </span>
)}

        </div>
        <div className="flex gap-2">
        <button
  onClick={(e) => {
    e.stopPropagation();
    openEditModal(todo);
  }}
  className="text-blue-500 hover:text-blue-700"
>
  ✏️
</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
   
</div>

      </li>
    ))}
  </ul>
  );
}

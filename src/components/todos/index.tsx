import { supabase } from "@/context/supabase";
import { ITodo } from "@/interface/Todo-interface";
import { UserMetadata } from "@supabase/supabase-js";
import { Plus, Trash2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import TodoModal from "./sections/todoModal";
import TodoDetailsModal from "./sections/todoDetailsModal";
import TodoList from "./sections/todoList";
import EmpthyState from "./sections/empthyState";
import { format, addDays, isEqual, subDays } from "date-fns"
import { Button } from "@/components/ui/button";
import { es } from "date-fns/locale";
import { useTranslation } from "react-i18next";

type TodosProps = {
  user: UserMetadata;
};

type Category = "personal" | "work" | "study" | "home";

export default function Todos({ user }: TodosProps) {
  const { t } = useTranslation();
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

  const [viewMode, setViewMode] = useState<"list" | "calendar" | "all">("list");

  useEffect(() => {
    getTodos();
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  
  const nextDays = Array.from({ length: 14 }, (_, i) => addDays(startDate, i))

  const goToPrevDays = () => {
    setStartDate(subDays(startDate, 14))
  }

  const goToNextDays = () => {
    setStartDate(addDays(startDate, 14))
  }

  const goToToday = () => {
    setStartDate(new Date())
    setSelectedDate(new Date())
  }
  
  const todosForSelectedDate = todos?.filter(todo => 
    isEqual(new Date(todo.due_date).setHours(0,0,0,0), selectedDate.setHours(0,0,0,0))
  )

  const resetForm = () => {
    setNewTodo({
      title: "",
      description: "",
      category: "" as Category,
      due_date: ""
    });
    setIsEditing(false);
    setSelectedTodo(null);
  };

  return (
    <div className="flex-grow flex flex-col items-center px-6 py-8 relative">      
      {viewMode === "list" ? (
        <>
          <div className="w-full max-w-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-black">{t('tasks.title')}</h1>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevDays}
                  className="border-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  className="border-gray-100"
                >
                  {t('tasks.calendar.today')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextDays}
                  className="border-gray-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto pb-2 h-28">
              <div className="flex gap-2">
                {nextDays.map((date) => (
                  <Button
                    key={date.toISOString()}
                    variant={isEqual(date.setHours(0,0,0,0), selectedDate.setHours(0,0,0,0)) ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDate(date)}
                    className="min-w-[100px] min-h-[70px]"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xs">{format(date, "EEE", { locale: es })}</span>
                      <span className="text-lg font-bold">{format(date, "d")}</span>
                      <span className="text-xs">{format(date, "MMM", { locale: es })}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            {todos && todos.length > 0 && todosForSelectedDate && todosForSelectedDate.length > 0 ? (
              <TodoList 
                openEditModal={openEditModal} 
                setSelectedTodo={setSelectedTodo} 
                setIsViewModalOpen={setIsViewModalOpen} 
                todos={todosForSelectedDate} 
                toggleTodo={toggleTodo} 
                deleteTodo={deleteTodo} 
              />
            ) : (
              <EmpthyState />
            )}
          </div>
        </>
      ) : viewMode === "calendar" ? (
        <div className="w-full max-w-md">
        </div>
      ) : (
        <div className="w-full max-w-md">
          {todos && todos.length > 0 ? (
            <TodoList 
              openEditModal={openEditModal} 
              setSelectedTodo={setSelectedTodo} 
              setIsViewModalOpen={setIsViewModalOpen} 
              todos={todos} 
              toggleTodo={toggleTodo} 
              deleteTodo={deleteTodo} 
            />
          ) : (
            <EmpthyState />
          )}
        </div>
      )}
      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="fixed bottom-20 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <Plus size={24} />
      </button>
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-6">
        <Button
          variant={"ghost"}
          onClick={() => setViewMode("list")}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-lg">📅</span>
          <span className="text-xs">{t('tasks.navigation.today')}</span>
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setViewMode("all")}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-lg">📝</span>
          <span className="text-xs">{t('tasks.navigation.all')}</span>
        </Button>
      </div>

      {/* Modales */}
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

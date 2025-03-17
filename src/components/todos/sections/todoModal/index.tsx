import { Category, ITodoModalProps } from "@/components/todos/ITodo-interface";
import { categories } from "@/constants/categories";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TodoModal({ 
  setIsModalOpen, 
  newTodo, 
  setNewTodo, 
  onSubmit,  
  isEditing 
}: ITodoModalProps) {
  const { t } = useTranslation();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          {isEditing ? t('tasks.modal.editTask') : t('tasks.modal.newTask')}
        </h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('tasks.details.fields.title')}
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
              {t('tasks.details.fields.description')}
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
              {t('tasks.details.fields.category')}
            </label>
            <div className="relative">
              <select
                value={newTodo.category}
                onChange={(e) => setNewTodo({...newTodo, category: e.target.value as Category})}
                className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8 text-black"
                required
              >
                <option value="">{t('tasks.modal.selectCategory')}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {t(`tasks.categories.${category.toLowerCase()}`)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('tasks.details.fields.dateTime')}
            </label>
            <input
              type="datetime-local"
              value={newTodo.due_date}
              onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
            >
              {isEditing ? t('tasks.modal.saveChanges') : t('tasks.modal.addButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

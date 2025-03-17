"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer, Views, type View } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { format, parse, startOfWeek, getDay, addDays, subDays } from "date-fns"
import { enUS } from "date-fns/locale/en-US"
import type { ITodo } from "@/interface/Todo-interface"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const locales = { "en-US": enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

export default function CalendarView({ todos }: { todos: ITodo[] | undefined }) {
  const [view, setView] = useState<View>(Views.DAY)
  const [currentDate, setCurrentDate] = useState(new Date())

  const events = todos?.map((todo) => ({
    title: todo.task,
    start: new Date(todo.due_date),
    end: new Date(todo.due_date),
    resource: todo,
  }))

  const goToToday = () => setCurrentDate(new Date())
  const goToNext = () => {
    if (view === Views.DAY) {
      setCurrentDate(addDays(currentDate, 1))
    } else if (view === Views.WEEK) {
      setCurrentDate(addDays(currentDate, 7))
    } else {
      const newDate = new Date(currentDate)
      newDate.setMonth(newDate.getMonth() + 1)
      setCurrentDate(newDate)
    }
  }

  const goToPrev = () => {
    if (view === Views.DAY) {
      setCurrentDate(subDays(currentDate, 1))
    } else if (view === Views.WEEK) {
      setCurrentDate(subDays(currentDate, 7))
    } else {
      const newDate = new Date(currentDate)
      newDate.setMonth(newDate.getMonth() - 1)
      setCurrentDate(newDate)
    }
  }

  const dayFormat = (date: Date) => {
    return `${format(date, "EEEE MMM d")}`
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-5xl mx-auto mb-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Calendario de Tareas</h2>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-100 hover:bg-gray-50 text-sm h-8"
              onClick={goToToday}
            >
              Hoy
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-100 hover:bg-gray-50 h-8 w-8"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-100 hover:bg-gray-50 h-8 w-8"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-sm font-medium">{dayFormat(currentDate)}</div>
        </div>

        <div className="flex rounded-md overflow-hidden border border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1 rounded-none border-r border-gray-100 text-sm h-8",
              view === Views.MONTH ? "bg-gray-50" : "hover:bg-gray-50",
            )}
            onClick={() => setView(Views.MONTH)}
          >
            Mes
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1 rounded-none border-r border-gray-100 text-sm h-8",
              view === Views.WEEK ? "bg-gray-50" : "hover:bg-gray-50",
            )}
            onClick={() => setView(Views.WEEK)}
          >
            Semana
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1 rounded-none border-r border-gray-100 text-sm h-8",
              view === Views.DAY ? "bg-gray-50" : "hover:bg-gray-50",
            )}
            onClick={() => setView(Views.DAY)}
          >
            Día
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-1 rounded-none text-sm h-8", view === Views.AGENDA ? "bg-gray-50" : "hover:bg-gray-50")}
            onClick={() => setView(Views.AGENDA)}
          >
            Agenda
          </Button>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events || []}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={view}
          onView={(newView) => setView(newView)}
          style={{ height: 500 }}
          toolbar={false}
          formats={{
            timeGutterFormat: (date) => format(date, "h:mm a"),
            dayHeaderFormat: (date) => format(date, "EEEE MMM d"),
          }}
          components={{
            event: (props) => (
              <div className="bg-green-50 border-l-2 border-green-500 p-1 rounded text-xs overflow-hidden">
                {props.title}
              </div>
            ),
          }}
        />
      </div>


    </div>
  )
}


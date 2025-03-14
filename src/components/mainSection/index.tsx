
export default function MainSection ({todos} : {todos: any[]}) {
return ( 
    <div className="mx-4 my-12">
    <div className="flex flex-col gap-3">
      <p>Crear la nota</p>
      <p className="text-red-500">Inhabilitado</p>
    </div>
    <div className="my-4 flex flex-col gap-4">
      <p>Notas:</p>
      <div className="w-full border-2 border-gray-300 pb-10 px-2 pt-2">
        {todos && todos.map((todo,index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <input type="checkbox" />
                <p>{todo.title}</p>
              </div>
            )
        })}
      </div>
    </div>
  </div>
)
}
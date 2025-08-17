import { cn } from '../lib/utils'

const TaskCard = ({ 
  task, 
  onToggle, 
  onDelete, 
  onEdit,
  className = "" 
}) => {
  const handleToggle = () => {
    onToggle(task.id)
  }

  const handleDelete = () => {
    onDelete(task.id)
  }

  const handleEdit = () => {
    onEdit(task.id)
  }

  return (
    <div 
      className={cn(
        "bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 mb-4 transform transition-all duration-200 hover:shadow-[12px_12px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1",
        task.completed && "bg-gray-100 opacity-75",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={handleToggle}
            className={cn(
              "w-6 h-6 border-3 border-black flex items-center justify-center font-bold text-lg transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5",
              task.completed 
                ? "bg-black text-white" 
                : "bg-white text-transparent hover:bg-gray-100"
            )}
          >
            {task.completed && "✓"}
          </button>
          
          <div className="flex-1">
            <h3 
              className={cn(
                "text-lg font-bold mb-2",
                task.completed && "line-through text-gray-500"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p 
                className={cn(
                  "text-gray-700 text-sm",
                  task.completed && "text-gray-400"
                )}
              >
                {task.description}
              </p>
            )}
            {task.priority && (
              <div className="mt-2">
                <span 
                  className={cn(
                    "inline-block px-2 py-1 text-xs font-bold border-2 border-black",
                    task.priority === "high" && "bg-red-300",
                    task.priority === "medium" && "bg-yellow-300",
                    task.priority === "low" && "bg-green-300"
                  )}
                >
                  {task.priority.toUpperCase()}
                </span>
              </div>
            )}
            {task.dueDate && (
              <div className="mt-2 text-xs text-gray-600">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="bg-blue-400 border-2 border-black px-3 py-2 font-bold text-sm hover:bg-blue-500 hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            EDIT
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-400 border-2 border-black px-3 py-2 font-bold text-sm hover:bg-red-500 hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
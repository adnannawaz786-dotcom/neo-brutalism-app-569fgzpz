
const NewTaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    setIsSubmitting(true);
    
    const newTask = {
      id: Date.now().toString(),
      text: task.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await onAddTask(newTask);
      setTask('');
      setPriority('medium');
      setCategory('general');
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'LOW', color: 'bg-green-400' },
    { value: 'medium', label: 'MED', color: 'bg-yellow-400' },
    { value: 'high', label: 'HIGH', color: 'bg-red-400' },
  ];

  const categoryOptions = [
    { value: 'general', label: 'GENERAL' },
    { value: 'work', label: 'WORK' },
    { value: 'personal', label: 'PERSONAL' },
    { value: 'urgent', label: 'URGENT' },
  ];

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] mb-8">
      <div className="bg-purple-400 border-b-4 border-black p-4">
        <h2 className="text-2xl font-black text-black uppercase tracking-wider">
          ADD NEW TASK
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label htmlFor="task" className="block text-lg font-black text-black uppercase mb-3">
            TASK DESCRIPTION
          </label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="ENTER YOUR TASK..."
            className="w-full p-4 text-lg font-bold border-4 border-black bg-white placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow uppercase"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-black text-black uppercase mb-3">
              PRIORITY
            </label>
            <div className="space-y-2">
              {priorityOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={priority === option.value}
                    onChange={(e) => setPriority(e.target.value)}
                    className="sr-only"
                    disabled={isSubmitting}
                  />
                  <div className={`w-6 h-6 border-3 border-black ${
                    priority === option.value ? option.color : 'bg-white'
                  } group-hover:shadow-[2px_2px_0px_0px_#000] transition-shadow`}>
                    {priority === option.value && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black"></div>
                      </div>
                    )}
                  </div>
                  <span className="font-black text-black text-lg">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-lg font-black text-black uppercase mb-3">
              CATEGORY
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 text-lg font-black border-4 border-black bg-white focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-shadow uppercase cursor-pointer"
              disabled={isSubmitting}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!task.trim() || isSubmitting}
            className="flex-1 bg-green-400 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed border-4 border-black p-4 font-black text-black text-lg uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] active:shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            {isSubmitting ? 'ADDING...' : 'ADD TASK'}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setTask('');
              setPriority('medium');
              setCategory('general');
            }}
            disabled={isSubmitting}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed border-4 border-black px-6 py-4 font-black text-black text-lg uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] active:shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            CLEAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTaskForm;
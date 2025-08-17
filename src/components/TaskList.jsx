import { cn } from '../lib/utils';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('neo-brutalism-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('neo-brutalism-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: editingText.trim() } : task
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-6xl font-black text-black mb-4 transform -rotate-1">
          TO-DO LIST
        </h1>
        <div className="bg-yellow-400 border-4 border-black p-4 transform rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xl font-bold">GET STUFF DONE!</p>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="mb-8">
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, addTask)}
              placeholder="What needs to be done?"
              className="flex-1 p-3 text-lg font-bold border-4 border-black focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
            <button
              onClick={addTask}
              className="px-8 py-3 bg-green-400 border-4 border-black font-black text-lg hover:bg-green-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              ADD
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-400 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
          <div className="text-3xl font-black">{tasks.length}</div>
          <div className="font-bold">TOTAL</div>
        </div>
        <div className="bg-red-400 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
          <div className="text-3xl font-black">{pendingTasks.length}</div>
          <div className="font-bold">PENDING</div>
        </div>
        <div className="bg-green-400 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
          <div className="text-3xl font-black">{completedTasks.length}</div>
          <div className="font-bold">DONE</div>
        </div>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Tasks */}
        <div>
          <h2 className="text-3xl font-black mb-4 text-red-600 transform rotate-1">
            PENDING ({pendingTasks.length})
          </h2>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {editingId === task.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      className="w-full p-2 border-2 border-black font-bold focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-green-400 border-2 border-black font-bold hover:bg-green-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        SAVE
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-400 border-2 border-black font-bold hover:bg-gray-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg flex-1">{task.text}</span>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className="px-3 py-2 bg-green-400 border-2 border-black font-bold hover:bg-green-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        title="Mark as complete"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        className="px-3 py-2 bg-blue-400 border-2 border-black font-bold hover:bg-blue-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        title="Edit task"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-2 bg-red-400 border-2 border-black font-bold hover:bg-red-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        title="Delete task"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <div className="bg-gray-200 border-4 border-black p-8 text-center transform rotate-1">
                <p className="text-xl font-bold text-gray-600">NO PENDING TASKS!</p>
                <p className="font-bold text-gray-500">Time to add some work...</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-3xl font-black mb-4 text-green-600 transform -rotate-1">
            COMPLETED ({completedTasks.length})
          </h2>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-green-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-80"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg flex-1 line-through text-gray-700">
                    {task.text}
                  </span>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="px-3 py-2 bg-yellow-400 border-2 border-black font-bold hover:bg-yellow-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      title="Mark as pending"
                    >
                      ↺
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-3 py-2 bg-red-400 border-2 border-black font-bold hover:bg-red-500 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                      title="Delete task"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {completedTasks.length === 0 && (
              <div className="bg-gray-200 border-4 border-black p-8 text-center transform -rotate-1">
                <p className="text-xl font-bold text-gray-600">NO COMPLETED TASKS!</p>
                <p className="font-bold text-gray-500">Get to work!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear All Button */}
      {tasks.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all tasks?')) {
                setTasks([]);
              }
            }}
            className="px-8 py-4 bg-red-500 border-4 border-black font-black text-xl text-white hover:bg-red-600 active:translate-x-2 active:translate-y-2 active:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all transform rotate-1"
          >
            CLEAR ALL TASKS
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
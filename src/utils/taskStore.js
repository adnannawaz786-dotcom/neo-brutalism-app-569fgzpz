// Task management store using local storage
class TaskStore {
  constructor() {
    this.tasks = this.loadTasks();
    this.listeners = [];
  }

  // Load tasks from localStorage
  loadTasks() {
    try {
      const stored = localStorage.getItem('neo-brutalism-tasks');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  // Save tasks to localStorage
  saveTasks() {
    try {
      localStorage.setItem('neo-brutalism-tasks', JSON.stringify(this.tasks));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  // Subscribe to task changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of changes
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.tasks));
  }

  // Get all tasks
  getTasks() {
    return [...this.tasks];
  }

  // Get task by id
  getTask(id) {
    return this.tasks.find(task => task.id === id);
  }

  // Add new task
  addTask(taskData) {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title || '',
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'general',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
    return newTask;
  }

  // Update existing task
  updateTask(id, updates) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveTasks();
    return this.tasks[taskIndex];
  }

  // Toggle task completion
  toggleTask(id) {
    const task = this.getTask(id);
    if (!task) return null;

    return this.updateTask(id, { completed: !task.completed });
  }

  // Delete task
  deleteTask(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    
    if (this.tasks.length !== initialLength) {
      this.saveTasks();
      return true;
    }
    return false;
  }

  // Clear all tasks
  clearAllTasks() {
    this.tasks = [];
    this.saveTasks();
  }

  // Clear completed tasks
  clearCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveTasks();
  }

  // Get tasks by completion status
  getTasksByStatus(completed) {
    return this.tasks.filter(task => task.completed === completed);
  }

  // Get tasks by priority
  getTasksByPriority(priority) {
    return this.tasks.filter(task => task.priority === priority);
  }

  // Get tasks by category
  getTasksByCategory(category) {
    return this.tasks.filter(task => task.category === category);
  }

  // Get task statistics
  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    const priorities = {
      high: this.tasks.filter(task => task.priority === 'high' && !task.completed).length,
      medium: this.tasks.filter(task => task.priority === 'medium' && !task.completed).length,
      low: this.tasks.filter(task => task.priority === 'low' && !task.completed).length
    };

    const categories = this.tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      priorities,
      categories
    };
  }

  // Search tasks
  searchTasks(query) {
    if (!query) return this.tasks;
    
    const searchTerm = query.toLowerCase();
    return this.tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm) ||
      task.category.toLowerCase().includes(searchTerm)
    );
  }

  // Sort tasks
  sortTasks(sortBy = 'createdAt', order = 'desc') {
    const sorted = [...this.tasks].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      // Handle priority sorting with custom order
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aVal = priorityOrder[aVal] || 0;
        bVal = priorityOrder[bVal] || 0;
      }

      // Handle date sorting
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      // Handle string sorting
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return sorted;
  }

  // Export tasks as JSON
  exportTasks() {
    return {
      tasks: this.tasks,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
  }

  // Import tasks from JSON
  importTasks(data, merge = false) {
    try {
      if (!data.tasks || !Array.isArray(data.tasks)) {
        throw new Error('Invalid import data format');
      }

      if (merge) {
        // Merge with existing tasks, avoiding duplicates
        const existingIds = new Set(this.tasks.map(task => task.id));
        const newTasks = data.tasks.filter(task => !existingIds.has(task.id));
        this.tasks = [...this.tasks, ...newTasks];
      } else {
        // Replace all tasks
        this.tasks = data.tasks;
      }

      this.saveTasks();
      return true;
    } catch (error) {
      console.error('Error importing tasks:', error);
      return false;
    }
  }
}

// Create singleton instance
const taskStore = new TaskStore();

// Export the store instance and utility functions
export default taskStore;

export const {
  getTasks,
  getTask,
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  clearAllTasks,
  clearCompleted,
  getTasksByStatus,
  getTasksByPriority,
  getTasksByCategory,
  getStats,
  searchTasks,
  sortTasks,
  subscribe,
  exportTasks,
  importTasks
} = taskStore;

// Priority levels
export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

// Default categories
export const DEFAULT_CATEGORIES = [
  'general',
  'work',
  'personal',
  'shopping',
  'health',
  'finance',
  'education',
  'travel'
];

// Task validation
export const validateTask = (task) => {
  const errors = [];

  if (!task.title || task.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (task.title && task.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (task.description && task.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  if (task.priority && !Object.values(PRIORITY_LEVELS).includes(task.priority)) {
    errors.push('Invalid priority level');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import './App.css';

function App() {
  // 1. State initialization with Lazy Loading from LocalStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all'); // all, active, completed

  // 2. Save to LocalStorage whenever tasks change
  useEffect(() => {
    console.log('Saving tasks to localStorage:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 3. Helper Functions (CRUD)
  const addTask = (text, dueDate) => {
    const newTask = {
      id: crypto.randomUUID(), // React 19 / Modern Browsers
      text,
      dueDate: dueDate || null,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const editTaskDueDate = (id, newDueDate) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, dueDate: newDueDate } : task
    ));
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    console.log('App.editTask called', { id, newText });
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  // 4. Calculate filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>מנהל משימות</h1>
      
      <TodoInput onAdd={addTask} />
      
      <TodoFilters 
        currentFilter={filter} 
        setFilter={setFilter} 
        activeCount={tasks.filter(t => !t.completed).length}
      />
      
      <TodoList 
        tasks={filteredTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask}
        onEdit={editTask}
        onEditDueDate={editTaskDueDate}
      />
    </div>
  );
}

export default App;
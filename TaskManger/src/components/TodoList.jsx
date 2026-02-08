import TodoItem from './TodoItem';

export default function TodoList({ tasks, onToggle, onDelete, onEdit, onEditDueDate }) {
  if (tasks.length === 0) {
    return <p className="list-empty">אין משימות להצגה</p>;
  }

  return (
    <div className="list">
      {tasks.map(task => (
        <TodoItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete}
          onEdit={onEdit}
          onEditDueDate={onEditDueDate}
        />
      ))}
    </div>
  );
}
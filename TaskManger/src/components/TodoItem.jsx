import { useState } from 'react';

export default function TodoItem({ task, onToggle, onDelete, onEdit, onEditDueDate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDate, setEditDate] = useState(task.dueDate || '');

  const handleSave = () => {
    console.log('TodoItem.handleSave', { id: task.id, editText, editDate });
    onEdit(task.id, editText);
    onEditDueDate(task.id, editDate);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'לא הוגדרה';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('he-IL');
  };

  return (
    <div className="todo-item">
      {/* Checkbox */}
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggle(task.id)}
      />

      {/* Task Text */}
      {isEditing ? (
        <input 
          type="text" 
          value={editText} 
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        <span className={task.completed ? 'completed' : ''}>
          {task.text}
        </span>
      )}

      {/* Due Date */}
      <div className="due-date">
        {isEditing ? (
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <span>{formatDate(task.dueDate)}</span>
        )}
      </div>

      {/* Buttons */}
      <div className="todo-item-buttons">
        {isEditing ? (
          <button className="btn-edit" onClick={handleSave}>שמור</button>
        ) : (
          <button className="btn-edit" onClick={() => { setEditText(task.text); setEditDate(task.dueDate || ''); setIsEditing(true); }}>ערוך</button>
        )}
        <button className="btn-delete" onClick={() => onDelete(task.id)}>מחק</button>
      </div>
    </div>
  );
}
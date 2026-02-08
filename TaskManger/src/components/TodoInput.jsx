import { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!text.trim()) {
      setError('יש להוסיף תיאור למשימה');
      return;
    }

    if (!dueDate) {
      setError('יש לבחור תאריך לסיום המשימה');
      return;
    }

    onAdd(text, dueDate);
    setText('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="form-row">
        <div className="input-group" style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="מה המשימה שנדרש לבצע?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="input-group date-input">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="submit-btn">הוסף משימה</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
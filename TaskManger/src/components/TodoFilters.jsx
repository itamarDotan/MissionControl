export default function TodoFilters({ currentFilter, setFilter, activeCount }) {
  return (
    <div className="filters">
      <button 
        className={currentFilter === 'all' ? 'active' : ''} 
        onClick={() => setFilter('all')}
      >
        הכל
      </button>
      <button 
        className={currentFilter === 'active' ? 'active' : ''} 
        onClick={() => setFilter('active')}
      >
        פעיל ({activeCount})
      </button>
      <button 
        className={currentFilter === 'completed' ? 'active' : ''} 
        onClick={() => setFilter('completed')}
      >
        הושלם
      </button>
    </div>
  );
}
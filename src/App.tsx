import './styles.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { useTodos } from './hooks/useTodos'


export default function App() {
  const { visible, filter, setFilter, add, toggle, remove, clearCompleted, remaining } = useTodos()


  return (
    <div className="container">
      <h1 className="h1">Mindbox Todo</h1>
      <TodoInput onAdd={add} />


      <TodoList items={visible} onToggle={toggle} onRemove={remove} />


      <div className="footer" role="contentinfo">
        <span className="badge">Осталось: {remaining}</span>
        <div className="tabs" role="tablist" aria-label="Фильтры задач">
          <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')} role="tab" aria-selected={filter === 'all'}>Все</button>
          <button className={`tab ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')} role="tab" aria-selected={filter === 'active'}>Активные</button>
          <button className={`tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')} role="tab" aria-selected={filter === 'completed'}>Выполненные</button>
        </div>
        <button className="button ghost" onClick={clearCompleted}>Очистить выполненные</button>
      </div>
    </div>
  )
}
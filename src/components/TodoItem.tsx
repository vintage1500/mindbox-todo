import type { Todo } from '../types'


export default function TodoItem({ todo, onToggle, onRemove }: {
    todo: Todo
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}) {
    return (
        <li className={`item ${todo.completed ? 'completed' : ''}`}>
            <input
                aria-label={todo.completed ? 'Снять отметку о выполнении' : 'Отметить как выполненную'}
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span className="title">{todo.title}</span>
            <button className="button ghost" onClick={() => onRemove(todo.id)} aria-label="Удалить задачу">Удалить</button>
        </li>
    )
}
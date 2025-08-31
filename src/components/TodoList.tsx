import type { Todo } from '../types'
import TodoItem from './TodoItem'


export default function TodoList({ items, onToggle, onRemove }: {
    items: Todo[]
    onToggle: (id: string) => void
    onRemove: (id: string) => void
}) {
    if (items.length === 0) {
        return <p style={{ color: '#9aa2b1', marginTop: 12 }}>Список пуст</p>
    }
    return (
        <ul className="list">
            {items.map(t => (
                <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
            ))}
        </ul>
    )
}
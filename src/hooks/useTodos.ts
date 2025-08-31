import { useEffect, useMemo, useState } from 'react'
import type { Filter, Todo } from '../types'


const STORAGE_KEY = 'mindbox_todos_v1'


function load(): Todo[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) as Todo[] : []
    } catch {
        return []
    }
}


function save(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}


export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>(() => load())
    const [filter, setFilter] = useState<Filter>('all')


    useEffect(() => { save(todos) }, [todos])


    const add = (title: string) => {
        const trimmed = title.trim()
        if (!trimmed) return
        setTodos(prev => [
            ...prev,
            { id: crypto.randomUUID(), title: trimmed, completed: false, createdAt: Date.now() },
        ])
    }


    const toggle = (id: string) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }


    const remove = (id: string) => {
        setTodos(prev => prev.filter(t => t.id !== id))
    }


    const clearCompleted = () => {
        setTodos(prev => prev.filter(t => !t.completed))
    }


    const remaining = useMemo(() => todos.filter(t => !t.completed).length, [todos])


    const visible = useMemo(() => {
        switch (filter) {
            case 'active': return todos.filter(t => !t.completed)
            case 'completed': return todos.filter(t => t.completed)
            default: return todos
        }
    }, [todos, filter])


    return { todos, visible, filter, setFilter, add, toggle, remove, clearCompleted, remaining }
}
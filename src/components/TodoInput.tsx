import { useState } from 'react'


export default function TodoInput({ onAdd }: { onAdd: (title: string) => void }) {
    const [value, setValue] = useState('')


    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd(value)
        setValue('')
    }


    return (
        <form className="row" onSubmit={submit} aria-label="Добавить задачу">
            <label htmlFor="new-todo" className="sr-only">Новая задача</label>
            <input
                id="new-todo"
                className="input"
                placeholder="Что нужно сделать?"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button className="button" type="submit">Добавить</button>
        </form>
    )
}
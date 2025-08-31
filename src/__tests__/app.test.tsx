import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'


function addTodo(title: string) {
    const input = screen.getByPlaceholderText('Что нужно сделать?') as HTMLInputElement
    const btn = screen.getByRole('button', { name: 'Добавить' })
    fireEvent.change(input, { target: { value: title } })
    fireEvent.click(btn)
}


describe('Mindbox Todo', () => {
    beforeEach(() => {
        // Чистим localStorage перед каждым тестом
        localStorage.clear()
    })


    it('добавляет новую задачу', () => {
        render(<App />)
        addTodo('Купить молоко')
        expect(screen.getByText('Купить молоко')).toBeInTheDocument()
    })


    it('переключает выполненность задачи', () => {
        render(<App />)
        addTodo('Сделать ДЗ')
        const checkbox = screen.getByRole('checkbox')
        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()
    })


    it('фильтрует: Активные / Выполненные', () => {
        render(<App />)
        addTodo('A')
        addTodo('B')
        const [cb1] = screen.getAllByRole('checkbox')
        fireEvent.click(cb1) // отметить A выполненной


        fireEvent.click(screen.getByRole('tab', { name: 'Активные' }))
        expect(screen.queryByText('A')).not.toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()


        fireEvent.click(screen.getByRole('tab', { name: 'Выполненные' }))
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.queryByText('B')).not.toBeInTheDocument()
    })


    it('очищает выполненные', () => {
        render(<App />)
        addTodo('X')
        const cb = screen.getByRole('checkbox')
        fireEvent.click(cb)
        fireEvent.click(screen.getByRole('button', { name: 'Очистить выполненные' }))
        expect(screen.queryByText('X')).not.toBeInTheDocument()
    })


    it('показывает количество оставшихся', () => {
        render(<App />)
        addTodo('A')
        addTodo('B')
        const [cb1] = screen.getAllByRole('checkbox')
        fireEvent.click(cb1) // одна выполнена, одна осталась
        expect(screen.getByText(/Осталось: 1/)).toBeInTheDocument()
    })
})
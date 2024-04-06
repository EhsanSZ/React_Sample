/* eslint-disable default-case */
import produce from 'immer'
import { StatusFilters } from '../filter/filterSlice'
const initState = {
    entities: {
        1: { id: 1, text: 'Deign ui', completed: true, color: 'red' },
        2: { id: 2, text: 'discover state', completed: false },
        3: { id: 3, text: 'discover actions', completed: false },
        4: { id: 4, text: 'implement reducer', completed: false, color: 'blue' },
        5: { id: 5, text: 'Complete patterns', completed: false, color: 'red' },
    }

}

const todosReducer = produce((state, action) => {
    switch (action.type) {
        case 'todos/todoAdded':
            const todo = action.payload
            state.entities[todo.id] = todo
            break
        case 'todos/todoToggled':
            const toggledTodoId = action.payload
            state.entities[toggledTodoId].completed = !state.entities[toggledTodoId].completed
            break
        case 'todos/todoDeleted':
            const deletedTodoId = action.payload
            delete state.entities[deletedTodoId]
    }
}, initState)

export default todosReducer

export const todoAdded = (text) => ({
    type: 'todos/todoAdded',
    payload: { id: 6, text, completed: false }
})

export const todoToggled = (todoId) => ({
    type: 'todos/todoToggled',
    payload: todoId
})

export const todoDeleted = (todoId) => ({
    type: 'todos/todoDeleted',
    payload: todoId
})

export const selectTodos = state => state.todos.entities

export const selectTodosIds = state => Object.keys(state.todos.entities)


const selectFilteredTodos = state => {
    const todos = Object.values(selectTodos(state))
    const { status, colors } = state.filters

    const showAll = status === StatusFilters.All

    if (showAll && colors.length === 0) {
        return todos
    }

    const showCompleted = status === StatusFilters.Completed
    return todos.filter(todo => {
        const statusFilter = showAll || todo.completed === showCompleted
        const colorsFilter = colors.length === 0 || colors.includes(todo.color)

        return statusFilter && colorsFilter
    })
}

export const selectFilterdTodoIds = state => {
    const filteredTodos = selectFilteredTodos(state)

    return filteredTodos.map(todo => todo.id)
}
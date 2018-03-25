import { createStore } from 'redux'
import { combineReducers } from 'redux'

export const addTodo = todo => ({
  type: 'ADD_TODO',
  todo
})

export const removeTodo = id => ({
  type: 'REMOVE_TODO',
  id
})

const initialState = {
  todos: []
}

const handleNewTodo = (state, action) => ({
  todos: [...state.todos, action.todo]
})

const handleRemoveTodo = (state, action) => ({
  todos: [
    ...state.todos.slice(0, action.id),
    ...state.todos.slice(action.id + 1)
  ]
})

const currentList = (state = initialState, action) => {
  const handlers = {
    REMOVE_TODO: handleRemoveTodo,
    ADD_TODO: handleNewTodo
  }
  return handlers[action.type] ? handlers[action.type](state, action) : state
}

const rootReducer = combineReducers({
  currentList
})

export const store = createStore(rootReducer)

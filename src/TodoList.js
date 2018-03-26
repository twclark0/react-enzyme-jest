import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addTodo, removeTodo } from './store'

import './TodoList.css'

export class TodoList extends Component {
  state = { input: '' }

  handleClick = i => () => {
    this.props.removeTodo(i)
  }

  handleChange = e => {
    this.setState({ input: e.currentTarget.value })
  }

  handleSubmit = () => {
    this.props.addTodo({text: this.state.input})
    this.setState({input: ''})
  }

  render() {
    return (
      <div className='todos--container'>
        <h1 className='todos--h1'>Todos</h1>
        <input type="text" onChange={this.handleChange} value={this.state.input} />
        <ul>
          {this.props.todos.map(({ text }, i) => (
            <li onClick={this.handleClick(i)} key={i}>
              {text}
            </li>
          ))}
        </ul>
        <button className='todo--button' onClick={this.handleSubmit}>Add Todo</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentList: {todos} }) => ({ todos })

const bindActionsToDispatch = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  removeTodo: id => dispatch(removeTodo(id))
})

const TodoListContainer = connect(mapStateToProps, bindActionsToDispatch)(
  TodoList
)

export default TodoListContainer

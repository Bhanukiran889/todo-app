import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

let nextId = 9 // Start after initial 8 todos

class SimpleTodos extends Component {
  state = {
    todoList: [
      {id: 1, title: 'Book the ticket for today evening', isCompleted: false},
      {
        id: 2,
        title: 'Rent the movie for tomorrow movie night',
        isCompleted: false,
      },
      {
        id: 3,
        title: 'Confirm the slot for the yoga session tomorrow morning',
        isCompleted: false,
      },
      {id: 4, title: 'Drop the parcel at Bloomingdale', isCompleted: false},
      {id: 5, title: 'Order fruits on Big Basket', isCompleted: false},
      {id: 6, title: 'Fix the production issue', isCompleted: false},
      {id: 7, title: 'Confirm my slot for Saturday Night', isCompleted: false},
      {id: 8, title: 'Get essentials for Sunday car wash', isCompleted: false},
    ],
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onClickAdd = () => {
    const {inputValue, todoList} = this.state
    const trimmedInput = inputValue.trim()

    if (trimmedInput === '') return

    const parts = trimmedInput.split(' ')
    const possibleNumber = parseInt(parts[parts.length - 1], 10)

    let count = 1
    let title = trimmedInput

    if (!Number.isNaN(possibleNumber)) {
      count = possibleNumber
      title = parts.slice(0, -1).join(' ')
    }

    const newTodos = Array.from({length: count}, () => {
      const todo = {
        id: nextId,
        title,
        isCompleted: false,
      }
      nextId += 1
      return todo
    })

    this.setState({
      todoList: [...todoList, ...newTodos],
      inputValue: '',
    })
  }

  deleteItem = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id),
    }))
  }

  updateTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  toggleCompleted = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  render() {
    const {todoList, inputValue} = this.state

    return (
      <div className="container">
        <h1>Simple Todos</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter todo"
            value={inputValue}
            onChange={this.onChangeInput}
            data-testid="todoInput"
          />
          <button type="button" onClick={this.onClickAdd}>
            Add
          </button>
        </div>
        <ul className="list-container">
          {todoList.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteItem={this.deleteItem}
              updateTodo={this.updateTodo}
              toggleCompleted={this.toggleCompleted}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default SimpleTodos

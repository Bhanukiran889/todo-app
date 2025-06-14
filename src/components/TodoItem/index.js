import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todo, deleteItem, updateTodo, toggleCompleted} = props
  const {id, title, isCompleted} = todo
  const [isEditing, setIsEditing] = useState(false)
  const [editInput, setEditInput] = useState(title)

  const onDelete = () => {
    deleteItem(id)
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onSave = () => {
    updateTodo(id, editInput)
    setIsEditing(false)
  }

  const onToggleCheckbox = () => {
    toggleCompleted(id)
  }

  return (
    <li className="list-item">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggleCheckbox}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editInput}
            onChange={e => setEditInput(e.target.value)}
          />
          <button type="button" onClick={onSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <p style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>
            {title}
          </p>
          <button type="button" onClick={onEdit}>
            Edit
          </button>
        </>
      )}
      <button className="btn" type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem

import './index.css'

const TodoItem = props => {
  const {todo, deleteItem} = props
  const {id, title} = todo

  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li>
      <div className="list-item">
        <p>{title}</p>
        <button className="btn" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem

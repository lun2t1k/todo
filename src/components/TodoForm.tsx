import {useState} from 'react'

type TodoFormProps = {
  addTodo: (title: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (title !== '') {
        addTodo(title)
        setTitle('')
      }
    }
  }

  return (
    <div className='todoForm'>
      <label htmlFor='title'>
        <input
          type='text'
          id='title'
          placeholder='Enter your task'
          value={title}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </label>
    </div>
  )
}

export default TodoForm

import {useState, useEffect} from 'react'
import Toastify from 'toastify-js'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import {Todo} from './types'

const App: React.FC = () => {
  const getTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
  const [todos, setTodos] = useState<Todo[]>(getTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {title, id: Date.now(), completed: false}
    setTodos(prev => [newTodo, ...prev])
  }

  const handleToggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )
    )
  }

  const handleRemoveTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    Toastify({
      text: 'Todo removed',
      duration: 2000,
      gravity: 'bottom',
      position: 'center',
      stopOnFocus: true,
    }).showToast()
  }

  return (
    <>
      <Header />
      <main>
        <div className='container'>
          <div className='main'>
            <TodoForm addTodo={handleAddTodo} />
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onRemove={handleRemoveTodo}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default App

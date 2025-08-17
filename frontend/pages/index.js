import { useState, useEffect } from 'react';
import { getCsrfToken, getTodos, createTodo, logout } from '../lib/api';

export default function Home() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const init = async () => {
      await getCsrfToken();
      const { data } = await getTodos();
      setTodos(data);
    };
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await createTodo(title);
    const { data } = await getTodos();
    setTodos(data);
    setTitle('');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>Todos</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

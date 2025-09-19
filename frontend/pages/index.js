import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCsrfToken, getTodos, createTodo, logout, getUser } from '../lib/api';

export default function Home() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await getCsrfToken();
      try {
        const { data: userData } = await getUser();
        setUser(userData.email);
      } catch (err) {
        router.push('/login');
        return;
      }
      const { data } = await getTodos();
      setTodos(data);
    };
    init();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await getCsrfToken();
    await createTodo(title);
    const { data } = await getTodos();
    setTodos(data);
    setTitle('');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div>
      <h1>Todos</h1>
      {user && <p>Logged in as {user}</p>}
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

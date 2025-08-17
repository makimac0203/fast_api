import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://demo-rttt.onrender.com',
  withCredentials: true,
});

export const getCsrfToken = async () => {
  const { data } = await client.get('/api/csrftoken');
  client.defaults.headers.common['X-CSRF-Token'] = data.csrf_token;
  return data.csrf_token;
};

export const register = (email, password) =>
  client.post('/api/register', { email, password });

export const login = (email, password) =>
  client.post('/api/login', { email, password });

export const logout = () => client.post('/api/logout');

export const createTodo = (title) =>
  client.post('/api/todo', { title });

export const getTodos = () => client.get('/api/todo');

export const getUser = () => client.get('/api/user');


import { useState, useEffect } from 'react';
import { getCsrfToken, register } from '../lib/api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

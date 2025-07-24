import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import PasswordInput from '../components/PasswordInput';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/login', { username, password });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        onLogin(res.data.token);
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <input
          className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <PasswordInput value={password} onChange={setPassword} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 underline">Register</Link>
        </div>
      </form>
    </div>
  );
} 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export function LoginPage({ onLogin }) {
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

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setRegisterSuccess('');
    setLoading(true);
    try {
      const res = await api.post('/register', { username, password });
      if (res.status === 201) {
        setRegisterSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="w-full max-w-sm p-6 bg-white rounded shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {registerSuccess && <div className="text-green-600 text-center">{registerSuccess}</div>}
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
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 underline">Login</Link>
        </div>
      </form>
    </div>
  );
}

function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
        type={show ? 'text' : 'password'}
        placeholder="Password"
        value={value}
        onChange={e => onChange(e.target.value)}
        required
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? (
          // Eye open icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        ) : (
          // Eye closed icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5c1.772 0 3.366-.312 4.74-.832M21.75 12c-.511-1.045-1.249-2.291-2.193-3.442m-3.07-3.07C15.366 5.812 13.772 5.5 12 5.5c-2.376 0-4.365.668-5.99 1.723m12.96 12.96l-15-15" />
          </svg>
        )}
      </button>
    </div>
  );
} 
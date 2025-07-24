import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import PasswordInput from '../components/PasswordInput';

export default function RegisterPage() {
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
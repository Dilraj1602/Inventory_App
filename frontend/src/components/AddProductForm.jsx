import { useState } from 'react';
import api from '../api';

export default function AddProductForm({ token, onAdd }) {
  const [form, setForm] = useState({
    name: '',
    type: '',
    sku: '',
    image_url: '',
    description: '',
    quantity: '',
    price: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await api.post('/products', {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Product added!');
      setForm({ name: '', type: '', sku: '', image_url: '', description: '', quantity: '', price: '' });
      if (onAdd) onAdd();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  function InputField({ name, value, onChange, placeholder, type = 'text', required = false }) {
    return (
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder={placeholder}
        type={type}
        required={required}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 mt-16">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-gradient-to-br from-slate-50 to-slate-200 rounded-2xl shadow-2xl space-y-6 border border-slate-200">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Add Product</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <InputField name="type" value={form.type} onChange={handleChange} placeholder="Type" required />
          <InputField name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" required />
          <InputField name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" />
          <InputField name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" required />
          <InputField name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required />
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition" placeholder="Description" />
        <button type="submit" className="w-full bg-gradient-to-r from-slate-900 to-slate-700 text-white py-2 rounded-lg hover:from-slate-800 hover:to-slate-600 transition font-semibold shadow" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
} 
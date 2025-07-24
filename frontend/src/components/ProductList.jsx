import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function ProductList({ token, onUpdateQuantity }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);
  const navigate = useNavigate();

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/products?page=${pageNum}&limit=8`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
      setPage(res.data.page);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
    // eslint-disable-next-line
  }, [token]);

  const handleEdit = (id, quantity) => {
    setEditId(id);
    setEditQuantity(quantity);
  };

  const handleUpdate = async (id) => {
    if (!editQuantity || isNaN(editQuantity)) return;
    setLoading(true);
    try {
      await api.put(`/products/${id}/quantity`, { quantity: Number(editQuantity) }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      fetchProducts(page);
      if (onUpdateQuantity) onUpdateQuantity();
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  function ProductCard({ product, editId, editQuantity, onEdit, onChangeQuantity, onUpdate, onCancel, loading }) {
    return (
      <div
        className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center group hover:shadow-2xl transition-all min-h-[250px] relative"
      >
        <div className="w-full flex justify-center mb-3">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-28 h-28 object-cover rounded-xl shadow group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center bg-slate-100 rounded-xl text-gray-400">No image</div>
          )}
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="font-bold text-lg text-gray-800 mb-1 text-center hover:underline hover:text-blue-700 transition cursor-pointer">{product.name}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            {editId === product._id ? (
              <input
                type="number"
                className="w-16 p-1 border rounded text-center"
                value={editQuantity}
                onChange={e => onChangeQuantity(e.target.value)}
              />
            ) : (
              <span className="font-mono text-blue-700">{product.quantity}</span>
            )}
          </div>
          <div className="text-base font-semibold text-green-700 mb-4">${product.price}</div>
          <div className="flex flex-col gap-2 w-full items-center">
            {editId === product._id ? (
              <>
                <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition w-5/6" onClick={() => onUpdate(product._id)} disabled={loading}>Save</button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition flex items-center justify-center w-5/6"
                  onClick={onCancel}
                  aria-label="Cancel"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition w-5/6" onClick={() => onEdit(product._id, product.quantity)}>Edit</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 relative px-2 h-[100vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Products</h2>
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              editId={editId}
              editQuantity={editQuantity}
              onEdit={handleEdit}
              onChangeQuantity={setEditQuantity}
              onUpdate={handleUpdate}
              onCancel={() => setEditId(null)}
              loading={loading}
            />
          ))}
          {/* Fill empty grid spots if less than 8 products */}
          {Array.from({ length: 8 - products.length }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-transparent" />
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-2 mb-40">
        <button
          className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 transition disabled:opacity-50"
          onClick={() => fetchProducts(page - 1)}
          disabled={page <= 1 || loading}
        >
          Prev
        </button>
        <span className="px-2">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 bg-slate-200 rounded hover:bg-slate-300 transition disabled:opacity-50"
          onClick={() => fetchProducts(page + 1)}
          disabled={page >= totalPages || loading}
        >
          Next
        </button>
      </div>
      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-slate-900 to-slate-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-slate-800 hover:to-slate-600 hover:scale-105 transition-all text-lg font-semibold z-50"
        onClick={() => navigate('/add-product')}
      >
        + Add Product
      </button>
    </div>
  );
} 
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onLogout, isLoggedIn }) {
  const location = useLocation();
  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-8 py-3 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-6">
        <Link to="/products" className="font-bold text-xl tracking-wide hover:text-blue-200 transition">Inventory App</Link>
        {isLoggedIn && location.pathname !== '/products' && (
          <Link to="/products" className="hover:text-blue-200 transition">Products</Link>
        )}
      </div>
      {isLoggedIn && (
        <button
          className="bg-white text-slate-900 px-4 py-1 rounded hover:bg-slate-200 font-semibold shadow transition"
          onClick={onLogout}
        >
          Logout
        </button>
      )}
    </nav>
  );
} 
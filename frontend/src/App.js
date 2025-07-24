import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Navbar from './components/Navbar';

function AddProductFormWithRedirect({ token }) {
  const navigate = useNavigate();
  return <AddProductForm token={token} onAdd={() => navigate('/products')} />;
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} isLoggedIn={!!token} />
      <Routes>
        <Route path="/products" element={<ProductList token={token} />} />
        <Route path="/add-product" element={<AddProductFormWithRedirect token={token} />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
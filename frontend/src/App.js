import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

function AddProductFormWithRedirect({ token }) {
  const navigate = useNavigate();
  return <AddProductForm token={token} onAdd={() => navigate('/products')} />;
}

function isValidToken(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const isLoggedIn = !!token && isValidToken(token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={setToken} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <RegisterPage />
          } 
        />
        <Route
          path="/products"
          element={
            isLoggedIn ? <ProductList token={token} /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add-product"
          element={
            isLoggedIn ? <AddProductFormWithRedirect token={token} /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
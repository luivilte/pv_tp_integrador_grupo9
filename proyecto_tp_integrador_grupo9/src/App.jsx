import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm';
import Login from './pages/Login';
import Register from './pages/Register';
import { fetchProducts } from './redux/ProductsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar los productos al iniciar la app
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas */}
        <Route
          path="/"
          element={<PrivateRoute><Home /></PrivateRoute>}
        />
        <Route
          path="/favoritos"
          element={<PrivateRoute><Favorites /></PrivateRoute>}
        />
        <Route
          path="/producto/:id"
          element={<PrivateRoute><ProductDetail /></PrivateRoute>}
        />
        <Route
          path="/crear"
          element={<PrivateRoute><ProductForm /></PrivateRoute>}
        />
        <Route
          path="/editar/:id"
          element={<PrivateRoute><ProductForm /></PrivateRoute>}
        />
      </Routes>
    </>
  );
}

export default App;

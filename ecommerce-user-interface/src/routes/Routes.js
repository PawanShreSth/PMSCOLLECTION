import React from 'react';
import HomeScreen from '../pages/HomePage';
import Product from '../pages/ProductPage';
import Error from '../components/Error';
import { Routes, Route } from 'react-router-dom';
import CartPage from '../pages/CartPage';

const UIRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} exact />

      <Route path="/product/:id" element={<Product />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/cart/:productId" element={<CartPage />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default UIRoutes;

import React from 'react';
import HomeScreen from '../pages/HomePage';
import Product from '../pages/ProductPage';
import Error from '../components/Error';
import { Routes, Route } from 'react-router-dom';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import ShippingPage from '../pages/ShippingPage';
import PaymentPage from '../pages/PaymentPage';
import PlaceOrderPage from '../pages/PlaceOrderPage';

const UIRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/shipping" element={<ShippingPage />} />

      <Route path="/payment" element={<PaymentPage />} />

      <Route path="/placeorder" element={<PlaceOrderPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<HomeScreen />} exact />

      <Route path="/profile" element={<ProfilePage />} exact />

      <Route path="/product/:id" element={<Product />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/cart/:productId" element={<CartPage />} />

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default UIRoutes;

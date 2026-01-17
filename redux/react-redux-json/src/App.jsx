import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './containers/ProductPage';
import CartPage from './containers/CartPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
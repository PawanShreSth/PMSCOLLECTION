import React from 'react';
import { gridContainer } from './HomeScreen.module.css';
import Product from '../components/product/Product.js';
import products from '../products';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <div className={gridContainer}>
        {products.map(product => (
          <div>
            <Product {...product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;

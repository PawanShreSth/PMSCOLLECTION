import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { gridContainer } from './HomePage.module.css';
import Product from '../components/product/Product.js';

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // Default value is an empty array

  const getProducts = async () => {
    const res = await axios.get('/api/products');

    if (res) {
      setProducts(res.data)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

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

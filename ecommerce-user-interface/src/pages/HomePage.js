import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridContainer } from './HomePage.module.css';
import Product from '../components/product/Product.js';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    listProducts(dispatch);
  }, [dispatch]);

  // const products = [];

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className={gridContainer}>
          {products.map(product => (
            <div>
              <Product {...product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;

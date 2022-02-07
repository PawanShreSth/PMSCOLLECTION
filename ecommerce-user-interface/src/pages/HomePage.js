import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gridContainer } from './HomePage.module.css';
import Product from '../components/product/Product.js';
import { listProducts } from '../actions/productActions';

import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  console.log(productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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

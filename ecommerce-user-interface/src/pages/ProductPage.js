import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/rating/Rating';
import {
  div,
  img,
  divChild,
  h5,
  parentDiv,
  childDiv,
  divWithButton,
} from './ProductPage.module.css';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const { product, loading, error } = productDetails;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className={div}>
          <img className={img} src={product.image} alt={product.name} />
          <div className={divChild}>
            <h5 className={h5}>{product.name}</h5>
            <h6 style={{ textAlign: 'center', width: '100%' }}>
              <b>Price: ${product.price}</b>
            </h6>
            <Rating rating={product.rating} text={`${product.description}`} />

            <div className={parentDiv}>
              <div>
                <div className={childDiv}>
                  <span>Price:</span>
                  <span>${product.price}</span>
                </div>
                <div className={childDiv}>
                  <span>Status:</span>
                  <span>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className={divWithButton}>
                  <button>Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;

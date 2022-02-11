import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import Rating from '../components/rating/Rating';
import {
  div,
  select,
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
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { id } = useParams();
  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

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

                {product.countInStock > 0 && (
                  <div className={childDiv}>
                    <span>Quantity</span>

                    <span>
                      <select
                        value={quantity}
                        className={select}
                        onChange={e => setQuantity(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                )}

                {console.log(quantity)}

                {product.countInStock === 0 ? (
                  <Tooltip title="Out of stock">
                    <div className={divWithButton}>
                      <button disabled>Add To Cart</button>
                    </div>
                  </Tooltip>
                ) : (
                  <div className={divWithButton}>
                    <Link to={`/cart/${id}?quantity=${quantity}`}>
                      <button>Add To Cart</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;

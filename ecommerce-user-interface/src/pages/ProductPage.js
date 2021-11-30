import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../products';
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

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(prod => prod._id === id);

  return (
    <>
      <div className={div}>
        <img className={img} src={product.image} alt={product.name} />
        <div className={divChild}>
          <h5 className={h5}>{product.name}</h5>
          <h6 style={{ textAlign: 'center', width: '100%' }}>
            <b>Price: ${product.price}</b>
          </h6>
          <Rating
            rating={product.rating}
            text={`Description: ${product.description}`}
          />
        </div>
      </div>

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
    </>
  );
};

export default ProductPage;

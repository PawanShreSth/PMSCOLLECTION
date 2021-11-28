import React from 'react';
import Card from './Card';
import { a, div, h3, img } from './Product.module.css';

const Product = ({ _id, name, image, rating, price, numReviews }) => {
  return (
    <Card>
      <a href={`/product/${_id}`}>
        <img
          className={img}
          src={image}
          alt={name}
          style={{ marginTop: '1rem', marginBottom: '1.2rem' }}
        />
      </a>

      <div className={div}>
        <a className={a} href={`/product/${_id}`}>
          <div>
            <strong>{name}</strong>
          </div>
        </a>

        <div className={div}>
          <div
            className={div}
            style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }}
          >
            {rating} from {numReviews} reviews
          </div>
        </div>

        <h3 className={h3}>${price}</h3>
      </div>
    </Card>
  );
};

export default Product;

import React from 'react';
import Card from '../Card';
import Rating from '../rating/Rating';
import { Link } from 'react-router-dom';
import { a, div, h3, img } from './Product.module.css';

const Product = ({ _id, name, image, rating, price, numReviews }) => {
  console.log(image);

  if (typeof image === 'string' && image.includes('10.0.2.2')) {
    image = image.replace('10.0.2.2', '127.0.0.1');
  }

  return (
    <Card>
      <Link to={`/product/${_id}`}>
        <img
          className={img}
          src={image}
          alt={name}
          style={{ marginTop: '1rem', marginBottom: '1.2rem' }}
        />
      </Link>

      <div className={div}>
        <Link className={a} to={`/product/${_id}`}>
          <div>
            <strong>{name}</strong>
          </div>
        </Link>

        <div className={div} style={{ width: '100%' }}>
          <Rating rating={rating} text={` ${numReviews} reviews`} />
        </div>

        <h3 className={h3}>${price}</h3>
      </div>
    </Card>
  );
};

export default Product;

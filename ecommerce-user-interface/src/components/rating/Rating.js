import React from 'react';
import { i } from './Rating.module.css';

const Rating = ({ rating, text }) => {
  return (
    <div>
      <span>
        <i
          className={`${i}
              ${
                rating >= 1
                  ? 'fas fa-star'
                  : rating >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }`}
        ></i>
      </span>
      <span>
        <i
          className={`${i}
              ${
                rating >= 2
                  ? 'fas fa-star'
                  : rating >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }`}
        ></i>
      </span>
      <span>
        <i
          className={`${i}
              ${
                rating >= 3
                  ? 'fas fa-star'
                  : rating >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }`}
        ></i>
      </span>
      <span>
        <i
          className={`${i}
              ${
                rating >= 4
                  ? 'fas fa-star'
                  : rating >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }`}
        ></i>
      </span>
      <span>
        <i
          className={`${i}
              ${
                rating >= 5
                  ? 'fas fa-star'
                  : rating >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }`}
        ></i>
      </span>
      <div
        style={{
          padding: '.5rem',

          fontSize: '.8rem',
        }}
      >
        {text && text}
      </div>
    </div>
  );
};

export default Rating;

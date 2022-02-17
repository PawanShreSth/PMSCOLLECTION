import React from 'react';
import { Link } from 'react-router-dom';
import { ul } from './CheckoutSteps.module.css';

const liStyle = {
  listStyle: 'none',
};

const activeLink = {
  color: '#2b2b2b',
  textDecoration: 'none',
};

const nonActiveLink = {
  color: '#787a7d',
  cursor: 'not-allowed',
  textDecoration: 'none',
};

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <ul
      className={ul}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px',
      }}
    >
      <li style={{ ...liStyle }}>
        {step1 ? (
          <Link style={{ ...activeLink }} to="/login?redirect=shipping">
            Sign In
          </Link>
        ) : (
          <Link to="#" style={{ ...nonActiveLink }}>
            Sign In
          </Link>
        )}
      </li>

      <li style={{ ...liStyle }}>
        {step2 ? (
          <Link style={{ ...activeLink }} to="/shipping">
            Shipping
          </Link>
        ) : (
          <Link to="#" style={{ ...nonActiveLink }}>
            Shipping
          </Link>
        )}
      </li>

      <li style={{ ...liStyle }}>
        {step3 ? (
          <Link style={{ ...activeLink }} to="/payment">
            Payment
          </Link>
        ) : (
          <Link to="#" style={{ ...nonActiveLink }}>
            Payment
          </Link>
        )}
      </li>

      <li style={{ ...liStyle }}>
        {step4 ? (
          <Link style={{ ...activeLink }} to="/placeorder">
            Place Order
          </Link>
        ) : (
          <Link to="#" style={{ ...nonActiveLink }}>
            Place Order
          </Link>
        )}
      </li>
    </ul>
  );
};

export default CheckoutSteps;

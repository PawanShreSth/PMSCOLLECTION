import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { inputGroup, primary } from './RegisterPage.module.css';

const ShippingPage = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>
        <div className={inputGroup}>
          <label htmlFor="address">Address</label>
          <input
            onChange={e => setAddress(e.target.value)}
            value={address}
            type="text"
            name="address"
            placeholder="Enter Address"
            required
          />
        </div>

        <div className={inputGroup}>
          <label htmlFor="city">City</label>
          <input
            onChange={e => setCity(e.target.value)}
            value={city}
            type="text"
            name="city"
            placeholder="Enter City"
            required
          />
        </div>

        <div className={inputGroup}>
          <label htmlFor="postalCode">Postcal Code</label>
          <input
            onChange={e => setPostalCode(e.target.value)}
            value={postalCode}
            type="text"
            name="postalCode"
            placeholder="Enter Postal Code"
            required
          />
        </div>

        <button type="submit" className={primary}>
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingPage;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { input, primary, label } from './PaymentPage.module.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    // If user continues to payment without filling shipping info then redirecting them back to shipping form
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState();

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    if (!paymentMethod) {
      alert('Select a payment method inorder to proceed further!');
      return;
    }

    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <label className={label} htmlFor="PayPal">
            Paypal
          </label>
          <input
            className={input}
            type="radio"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            onChange={e => {
              setPaymentMethod(e.target.value);
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <label className={label} htmlFor="CashOnDelivery">
            Cash On Delivery
          </label>
          <input
            className={input}
            type="radio"
            id="CashOnDelivery"
            name="paymentMethod"
            value="CashOnDelivery"
            onChange={e => {
              setPaymentMethod(e.target.value);
            }}
          />
        </div>

        <button type="submit" className={primary}>
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentPage;

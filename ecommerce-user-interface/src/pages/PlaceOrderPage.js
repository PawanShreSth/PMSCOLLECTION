import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderPage = () => {
  const cart = useSelector(s => s.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const decimalsAdd = number => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };

  const orderCreate = useSelector(s => s.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order${order._id}`);
    }

    // eslint-disable-next-line
  });

  // Calculation of prices
  cart.itemsPrice = decimalsAdd(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // Calculate shipping price
  cart.shippingPrice = decimalsAdd(cart.itemsPrice > 10000 ? 0 : 150);

  // Calculate Tax price
  cart.taxPrice = decimalsAdd(Number((0.15 * cart.itemsPrice).toFixed(2)));

  // Total Price Calculation
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <CheckoutSteps step1 step2 step3 step4 />
        </Col>
      </Row>

      <div
        style={{
          margin: '2rem auto',
          maxWidth: '440px',
          backgroundColor: 'rgb(162, 183, 212)',
          padding: '1rem 2rem',
          borderRadius: '1em',
          boxShadow: '0 0 10px gray',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <p style={{ padding: '0.5rem' }}>
            <strong>Shipping Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
            {cart.shippingAddress.postalCode}
          </p>
        </div>

        <div style={{ textAlign: 'left' }}>
          <p style={{ padding: '0.5rem' }}>
            <strong>Payment Method: </strong>
            {cart.paymentMethod}
          </p>
        </div>

        <ul
          style={{
            listStyle: 'none',
            backgroundColor: '#073b52',
            padding: '.5em',
            borderRadius: '1em',
            color: '#fff',
          }}
        >
          <li>
            <h2>Order Summary</h2>
          </li>
          <li style={{ marginBottom: '.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <span>Items</span>
              <span>Rs.{cart.itemsPrice}</span>
            </div>
          </li>
          <li style={{ marginBottom: '.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <span>Shipping</span>
              <span>Rs.{cart.shippingPrice}</span>
            </div>
          </li>
          <li style={{ marginBottom: '.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <span>Tax</span>
              <span>Rs.{cart.taxPrice}</span>
            </div>
          </li>
          <li style={{ marginBottom: '.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <span>Total</span>
              <span>Rs.{cart.totalPrice}</span>
            </div>
          </li>

          <li>{error && <Message variant="danger">{error}</Message>}</li>

          <li style={{ marginBottom: '.3rem' }}>
            <Button
              type="button"
              className="btn-block"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
          </li>
        </ul>
      </div>

      <ul
        style={{
          listStyle: 'none',
          textAlign: 'left',
          maxWidth: '930px',
          margin: '0 auto',
          marginTop: '3rem',
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        <li
          style={{
            backgroundColor: 'rgb(162, 183, 212)',
            borderRadius: '1rem',
            padding: '1rem',
            borderBottom: '1px solid gray',
            margin: '1rem',
            boxShadow: '0 0 10px gray',
          }}
        >
          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Order Items
          </h2>
          {cart.cartItems.length === 0 ? (
            <Message>Your cart is empty</Message>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                padding: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {cart.cartItems.map((item, index) => (
                <li
                  key={index}
                  style={{
                    borderRadius: '1em',
                    marginBottom: '1rem',
                    backgroundColor: '#073b52',
                    padding: '.5rem',
                    margin: '.3rem',
                    maxWidth: '90%',
                    minWidth: '200px',
                    color: '#fff',
                  }}
                >
                  <Row>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '70px', borderRadius: '1em' }}
                      />
                    </Col>
                    <Col md={4}>
                      <Link
                        style={{
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          color: '#fff',
                        }}
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col
                      md={4}
                      style={{ fontSize: '0.8rem', fontWeight: '400' }}
                    >
                      {item.quantity} * {item.price} = Rs.
                      {item.quantity * item.price}
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </>
  );
};

export default PlaceOrderPage;

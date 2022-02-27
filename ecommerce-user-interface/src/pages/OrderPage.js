import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  ORDER_PAY_RESET,
  ORDER_DETAILS_RESET,
} from '../constant/orderConstants';

const OrderPage = () => {
  // const navigate = useNavigate();
  const { orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  console.log(orderId);
  const dispatch = useDispatch();

  const orderDetails = useSelector(s => s.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(s => s.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    // Building script tag dynamically usinh JS DOM.
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (successPay || !order) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET });
  }, [dispatch]);

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  console.log(order);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      {order.isDelivered ? (
        <Message variant="success">Deliverd on {order.deliveredAt}</Message>
      ) : (
        <Message variant="danger">Not Delivered</Message>
      )}
      {order.isPaid ? (
        <Message variant="success">Paid on {order.paidAt}</Message>
      ) : (
        <Message variant="danger">Not Paid</Message>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            margin: '2rem 0 1rem 0',
            maxWidth: '440px',
            backgroundColor: 'rgb(162, 183, 212)',
            padding: '1rem 2rem',
            borderRadius: '1em',
            boxShadow: '0 0 10px gray',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <p style={{ padding: '0.5rem' }}>
              <strong>Name: </strong> {order.user.name}
              <p>
                <strong>Email: </strong>
                <a
                  style={{ textDecoration: 'none', color: 'black' }}
                  href={`mailto:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </p>
              <strong>Shipping Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}
            </p>
          </div>

          <div style={{ textAlign: 'left' }}>
            <p style={{ padding: '0.5rem' }}>
              <strong>Payment Method: </strong>
              {order.paymentMethod}
            </p>
          </div>

          <ul
            style={{
              listStyle: 'none',
              backgroundColor: '#073b52',
              padding: '.8em',
              borderRadius: '1em',
              color: '#fff',
              maxWidth: '75%',
              margin: '0 auto',
              outline: '1px solid white',
              outlineOffset: '-5px',
              marginBottom: '1rem',
            }}
          >
            <li>
              <h2>Order Summary</h2>
            </li>
            <li style={{ marginBottom: '.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Items</span>
                <span>Rs.{order.itemsPrice}</span>
              </div>
            </li>
            <li style={{ marginBottom: '.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>Rs.{order.shippingPrice}</span>
              </div>
            </li>
            <li style={{ marginBottom: '.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax</span>
                <span>Rs.{order.taxPrice}</span>
              </div>
            </li>
            <li style={{ marginBottom: '.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total</span>
                <span>Rs.{order.totalPrice}</span>
              </div>
            </li>
          </ul>

          {!order.isPaid && (
            <div>
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <ul
        style={{
          listStyle: 'none',
          textAlign: 'left',
          maxWidth: '930px',
          margin: '0 auto',
          marginTop: '2rem',
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
            // margin: '1rem',
            boxShadow: '0 0 10px gray',
          }}
        >
          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Order Items
          </h2>
          {order.orderItems.length === 0 ? (
            <Message>Your order is empty</Message>
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
              {order.orderItems.map((item, index) => (
                <li
                  key={index}
                  style={{
                    borderRadius: '1em',
                    marginBottom: '1rem',
                    backgroundColor: '#073b52',
                    padding: '.5rem',
                    margin: '.3rem',
                    width: '85%',
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

export default OrderPage;

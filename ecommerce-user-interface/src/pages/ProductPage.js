import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { Button, Form } from 'react-bootstrap';
import Rating from '../components/rating/Rating';
import Meta from '../components/Meta';
import {
  div,
  select,
  img,
  divChild,
  h5,
  parentDiv,
  childDiv,
  divWithButton,
  reviewDiv,
  reviewForm,
  individualReview,
} from './ProductPage.module.css';
import {
  App,
  form,
  inputGroup,
  primary,
  secondary,
} from './LoginPage.module.css';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constant/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    if (errorProductReview) {
      setRating(0);
      setComment('');
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview, errorProductReview]);

  const submitHandler = e => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === '') {
      alert('Add a rating and review first before submitting a review!');
      return;
    }

    dispatch(createProductReview(id, { rating, comment }));
  };

  if (typeof product.image === 'string' && product.image.includes('10.0.2.2')) {
    product.image = product.image.replace('10.0.2.2', '127.0.0.1');
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
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
          <div className={reviewDiv}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ul style={{ padding: 0 }}>
              {product.reviews.map(review => (
                <li className={individualReview} key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}

              <li style={{ listStyle: 'none', marginTop: '1.5rem' }}>
                <h2>Write a customer review</h2>
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form
                    style={{
                      maxWidth: '400px',
                      margin: '0 auto',
                      padding: '.5rem',
                    }}
                    onSubmit={submitHandler}
                  >
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      style={{ marginTop: '1rem' }}
                      type="submit"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to="/login">Sign In</Link> to write a review
                  </Message>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gridContainer } from './HomePage.module.css';
import Product from '../components/product/Product.js';
import { listProducts } from '../actions/productActions';
import { Container } from 'react-bootstrap';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();
  let { keyword, pageNumber } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className={gridContainer}>
            {products.map(product => (
              <div>
                <Product {...product} />
              </div>
            ))}
          </div>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </Container>
  );
};

export default HomeScreen;

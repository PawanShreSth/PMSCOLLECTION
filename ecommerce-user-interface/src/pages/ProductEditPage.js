import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { USER_UPDATE_RESET } from '../constant/userConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  App,
  form,
  inputGroup,
  primary,
  uniqueInputGroup,
} from './RegisterPage.module.css';
import { PRODUCT_UPDATE_RESET } from '../constant/productConstants';

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const ProductEditPage = () => {
  const navigate = useNavigate();

  const { productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    // Resetting state of product update after successfully product updates
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [product, dispatch, productId, navigate, successUpdate]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    // DISPATCHING UPDATE PRODUCT
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <Link
        style={{ textDecoration: 'none', color: 'gray' }}
        to="/admin/productList"
      >
        Go Back
      </Link>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className={App}>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <form
              style={{ marginBottom: '.3rem' }}
              className={form}
              onSubmit={submitHandler}
            >
              <div className={inputGroup}>
                <label htmlFor="name">Name</label>
                <input
                  onChange={e => setName(e.target.value)}
                  value={name}
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                />
              </div>

              <div className={inputGroup}>
                <label htmlFor="price">Price</label>
                <input
                  onChange={e => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                />
              </div>

              <div className={inputGroup}>
                <label htmlFor="image">Image</label>
                <input
                  onChange={e => {
                    setImage(e.target.value);
                  }}
                  value={image}
                  type="text"
                  name="image"
                  placeholder="Enter Image URL"
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={uploadFileHandler}
                ></input>
                {uploading && <Loader />}
              </div>

              <div className={inputGroup}>
                <label htmlFor="category">Category</label>
                <input
                  onChange={e => {
                    setCategory(e.target.value);
                  }}
                  value={category}
                  type="text"
                  name="category"
                  placeholder="Enter Category"
                />
              </div>

              <div className={inputGroup}>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  onChange={e => {
                    setCountInStock(e.target.value);
                  }}
                  value={countInStock}
                  type="number"
                  name="countInStock"
                  placeholder="Enter Count In Stock"
                />
              </div>

              <div className={inputGroup}>
                <label htmlFor="description">Description</label>
                <input
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                />
              </div>
              <button type="submit" className={primary}>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductEditPage;

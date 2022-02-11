import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
  img,
  li,
  ul,
  a,
  price,
  div,
  header,
  button,
} from './CartPage.module.css';
import { BsTrashFill } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const CartPage = () => {
  const { productId } = useParams();
  let query = useQuery();
  const quantity = query.get('quantity') ? Number(query.get('quantity')) : 1;

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  // const checkoutHandler = () => {
  //   history.push('/login?redirect=shipping');
  // };

  return (
    <>
      <div className={header}>
        <h1>
          Shopping Cart <AiOutlineShoppingCart />
        </h1>

        <div
          style={{
            border: '1px solid #b8b7b6',
            padding: '10px 40px',
            borderRadius: '.5em',
            marginTop: '1rem',
            marginLeft: '1rem',
          }}
        >
          <h2>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            items
          </h2>
          Rs&nbsp;
          {cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2)}
          <div>
            {cartItems.length === 0 ? (
              <button
                type="button"
                className={button}
                disabled={cartItems.length === 0}
                style={{ cursor: 'not-allowed' }}
              >
                Proceed To Checkout
              </button>
            ) : (
              <button type="button" className={button}>
                <Link
                  style={{ color: 'white', textDecoration: 'none' }}
                  to={`/login?redirect=shipping`}
                >
                  Proceed To Checkout
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={div}>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty
            <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ul className={ul}>
            {cartItems.map(item => (
              <li className={li} key={item.product}>
                <>
                  <span>
                    <img className={img} src={item.image} alt={item.name} />
                  </span>

                  <span>
                    <Link className={a} to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </span>

                  <span className={price}>{item.price}</span>

                  <span>
                    <select
                      value={item.quantity}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </span>

                  <BsTrashFill
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeFromCartHandler(item.product)}
                  />
                </>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CartPage;

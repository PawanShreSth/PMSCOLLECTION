import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import {
  header,
  span,
  ul,
  li,
  hamburger,
  row1,
  row2,
  row3,
  show,
  a,
} from './AppHeader.module.css';

const AppHeader = () => {
  const dispatch = useDispatch();
  const [showClass, setShowClass] = useState(false);
  const userLogin = useSelector(state => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = _ => {
    dispatch(logout());
  };

  console.log(showClass);
  return (
    <header className={header}>
      <Link className={a} to="/">
        <span className={span}>PMS Collection</span>
      </Link>

      <ul className={`${ul} ${showClass ? show : ''}`}>
        <Link className={a} to="/cart">
          <li className={li}>
            <i className="fa fa-shopping-cart"></i>Cart
          </li>
        </Link>

        {userInfo ? (
          <NavDropdown title={userInfo.name} id="username">
            <NavDropdown.Item>
              <Link style={{ textDecoration: 'none' }} to="/profile">
                Profile
              </Link>
            </NavDropdown.Item>

            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Link className={a} to="/login">
            <li className={li}>
              <i className="fa fa-user"></i>Sign In
            </li>
          </Link>
        )}

        {userInfo && userInfo.isAdmin && (
          <NavDropdown title="Admin" id="adminmenu">
            <NavDropdown.Item>
              <Link
                style={{ textDecoration: 'none', display: 'block' }}
                to="/admin/userlist"
              >
                Users
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link style={{ textDecoration: 'none' }} to="/admin/productlist">
                Products
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link style={{ textDecoration: 'none' }} to="/admin/orderlist">
                Orders
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </ul>

      <span className={hamburger} onClick={() => setShowClass(!showClass)}>
        <span className={row1}></span>
        <span className={row2}></span>
        <span className={row3}></span>
      </span>
    </header>
  );
};

export default AppHeader;

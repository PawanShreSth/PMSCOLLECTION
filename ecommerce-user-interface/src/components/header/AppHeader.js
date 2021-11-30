import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [showClass, setShowClass] = useState(false);
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
        <Link className={a} to="/login">
          <li className={li}>
            <i className="fa fa-user"></i>Sign In
          </li>
        </Link>
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

import React, { useState } from 'react';
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
} from './AppHeader.module.css';

const AppHeader = () => {
  const [showClass, setShowClass] = useState(false);
  console.log(showClass);
  return (
    <header className={header}>
      <span className={span}>PMS Collection</span>

      <ul className={`${ul} ${showClass ? show : ''}`}>
        <li className={li}>
          <i className="fa fa-shopping-cart"></i>Cart
        </li>
        <li className={li}>
          <i className="fa fa-user"></i>Sign In
        </li>
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

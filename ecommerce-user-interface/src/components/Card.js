import React from 'react';
import { div } from './Card.module.css';

const Card = ({ children }) => {
  return <div className={div}>{children}</div>;
};

export default Card;

import express from 'express';

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productRoutes);

// Below middleware runs when the API does not match
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Listening on Port ${PORT} | Mode = ${process.env.NODE_ENV}`)
);

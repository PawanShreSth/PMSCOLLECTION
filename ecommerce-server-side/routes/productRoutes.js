import express from 'express';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// When "/api/products/" route is hit then all products will be retrieved from DB and then sent to the client.
// Public routes, token not required.
router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
      res.json(products);
    } else {
      res.status(404);
      throw new Error('No product available');
    }
  })
);

// If there is an ID in the body section of the request when the req hits "/api/products/:id",
// it will be used to find the particular product in database and sent to the client. Public routes, token not required.
router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;

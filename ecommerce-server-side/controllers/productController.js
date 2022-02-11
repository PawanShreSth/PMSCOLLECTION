import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// When "/api/products/" route is hit then all products will be retrieved from DB and then sent to the client.
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      throw new Error('Cannot GET products');
    }
    res.json(products);
  } catch (e) {
    res.status(404).json({
      message: 'Cannot GET products',
    });
  }
};

// If there is an ID in the body section of the request when the req hits "/api/products/:id",
// it will be used to find the particular product in database and sent to the client.
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
};

export { getProducts, getProductById };

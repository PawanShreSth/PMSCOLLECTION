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
      message: e.message,
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

// Description - Delete a product
// Route - DELETE /api/products/:id
// Access - Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({
        message: 'Product removed successfully',
      });
    }
  } catch (e) {
    res.status(404);
    throw new Error('Product not found');
  }
};

// Description - Create a product
// Route - POST /api/products
// Access - Private/Admin
const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Description - Update a product
// Route - PUT /api/products/:id
// Access - Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
};

import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// When "/api/products/" route is hit then all products will be retrieved from DB and then sent to the client.
const getProducts = async (req, res) => {
  let pageSize;
  if (req.query.pageNumber) {
    pageSize = 10;
  } else {
    pageSize = 1000000;
  }
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
        },
      }
    : {};

  try {
    const count = await Product.count({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (!products) {
      throw new Error('Cannot GET products');
    }
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// Description - Create new review
// Route - POST /api/products/:id/reviews
// Access - Private/
const createdProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400); // Bad Request
        throw new Error('Product already reviewed');
      }

      const review = {
        name: req.user.name,
        rating: Number(rating), // Rating of individual user
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      // Average rating out of all ratings
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({
        message: 'Review Added',
      });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Description - Get Top Rated Products
// Route - GET /api/products/top
// Access - Public/
const getTopProducts = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createdProductReview,
  getTopProducts,
};

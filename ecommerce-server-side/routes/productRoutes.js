import express from 'express';
import multer from 'multer';
import Product from '../models/productModel.js';
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createdProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createdProductReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

// router.get('/', getProducts)
// router.get('/:id', getProductById);

router.post(
  '/mpu',
  protect,
  admin,
  uploadOptions.single('image'),
  async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    console.log(fileName);
    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      user: req.user._id,
      image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: 0,
      description: req.body.description,
    });

    product = await product.save();

    if (!product) return res.status(500).send('The product cannot be created');

    res.status(200).send(product);
  }
);

export default router;

import mongoose from 'mongoose';
import reviewSchema from './reviewModel.js';

const productSchema = mongoose.Schema(
  {
    // For determining which admin created a product - // Will hold user/admins ID
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema], // array of review object
    //average rating out of all rating
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true } // helps to create "created at" and "updated at" fields automatically
);

const Product = mongoose.model('Product', productSchema);

export default Product;

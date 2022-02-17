import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// Description - Create new order
// Route - POST /api/orders
// Access - Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      totalPrice,
      shippingAddress,
      shippingPrice,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
    } = req.body;

    // Check to see if user has ordered with out any items
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No Order Items');
    } else {
      const order = new Order({
        totalPrice,
        user: req.user._id, // User gets figured out using token and assigned before creating order in DB.
        shippingAddress,
        shippingPrice,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
      });

      // Once saved mongodb will automatically assign a unique id
      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// Description - GET Order using ID assigned by mongodb
// Route - GET /api/orders/:id
// Access - Private
export const getOrderById = async (req, res) => {
  try {
    // in user, name and email will be taken from user document
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

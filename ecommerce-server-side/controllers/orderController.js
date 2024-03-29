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

      if (!createdOrder) {
        res.status(404).json({
          message: 'Order not created',
        });
      }
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// Description - GET Order using ID assigned by mongodb
// Route - GET /api/orders/:id/pay
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

// Description - Update order status to paid
// Route - PUT /api/orders/:id/pay
// Access - Private
export const updateOrderStatusToPaid = async (req, res) => {
  try {
    // in user, name and email will be taken from user document
    const order = await Order.findById(req.params.id);

    if (order) {
      if (
        req.body.id &&
        req.body.status &&
        req.body.update_time &&
        req.body.payer.email_address
      ) {
        order.isPaid = true;
        order.paidAt = Date.now();
      }
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
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

// Description - Get logged in user orders
// Route - GET /api/orders/myorders
// Access - Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json({
      message: error.message,
    });
  }
};

// Description - Get All Orders
// Route - GET /api/orders
// Access - Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');

    res.json(orders);
  } catch (error) {
    res.status(404);
    res.json({
      message: error.message,
    });
  }
};

// Description - Update order status to delivered
// Route - GET /api/orders/:id/deliver
// Access - Private/Admin
export const updateOrderStatusToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
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

// Description - Update order status to paid by admin
// Route - PUT /api/orders/:id/pay/admin
// Access - Private
export const updateOrderStatusToPaidByAdmin = async (req, res) => {
  try {
    // in user, name and email will be taken from user document
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      // order.paymentMethod = req.body.paymentMethod || 'Pa';

      const updatedOrder = await order.save();

      res.json(updatedOrder);
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

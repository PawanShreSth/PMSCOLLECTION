import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderStatusToPaid,
  updateOrderStatusToPaidByAdmin,
  getMyOrders,
  getOrders,
  updateOrderStatusToDelivered,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderStatusToPaid);
router.route('/:id/pay/admin').put(protect, updateOrderStatusToPaidByAdmin);
router.route('/:id/deliver').put(protect, admin, updateOrderStatusToDelivered);

export default router;

import express from 'express';
import {
  createWorkOrder,
  assignWorkOrder,
  updateWorkOrderStatus,
  getWorkOrdersByUser,
  getWorkOrdersByTechnician
} from '../controllers/workOrder.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['user', 'admin']), createWorkOrder);
router.put('/:id/assign', authMiddleware, roleMiddleware(['technician', 'admin']), assignWorkOrder);
router.put('/:id/status', authMiddleware, roleMiddleware(['technician', 'admin']), updateWorkOrderStatus);
router.get('/user', authMiddleware, roleMiddleware(['user', 'admin']), getWorkOrdersByUser);
router.get('/technician', authMiddleware, roleMiddleware(['technician', 'admin']), getWorkOrdersByTechnician);

export default router;
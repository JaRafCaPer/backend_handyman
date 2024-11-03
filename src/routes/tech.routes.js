import express from 'express';
import {
  registerTechnician,
  loginTechnician,
  updateTechnician
} from '../controllers/tech.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();
router.post('/register', registerTechnician);
router.post('/login', loginTechnician);
router.put('/update', authMiddleware, roleMiddleware(['admin']), updateTechnician);

export default router;
import express from 'express';
import {
  registerAdmin
} from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/register', authMiddleware, roleMiddleware(['admin']), registerAdmin);

export default router;
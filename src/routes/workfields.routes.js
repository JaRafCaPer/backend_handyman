import express from 'express';
import {
  createWorkfield,
  updateWorkfield,
  deleteWorkfield,
  getWorkfields
} from '../controllers/workfields.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();
router.post('/', authMiddleware, roleMiddleware(['admin']), createWorkfield);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateWorkfield);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteWorkfield);
router.get('/', authMiddleware, getWorkfields);

export default router;
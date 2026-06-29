import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getMe, googleAuth } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { registerValidation, loginValidation, validateRequest } from '../middleware/validationMiddleware';

router.post('/', registerValidation, validateRequest ,registerUser);
router.post('/login', loginValidation, validateRequest ,loginUser);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);

export default router;

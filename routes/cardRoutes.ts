import { Router } from 'express';
import { validateCardController } from '../controllers/cardController.js';

const router = Router();

router.post('/validate', validateCardController);

export default router;
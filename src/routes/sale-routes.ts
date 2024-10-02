import { Router } from 'express';
import { saleSave } from '../controllers/sale-controller';

const router = Router();

router.post('/sales', saleSave);

export default router;

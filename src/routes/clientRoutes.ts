import { Router } from 'express';
import { registerClient, getClient } from '../controllers/clientController';

const router = Router();

// Ruta para registrar un cliente
router.post('/clientes', registerClient);
router.get('/cliente/:code', getClient);

export default router;

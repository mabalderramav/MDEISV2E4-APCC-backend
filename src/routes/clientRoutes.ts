import { Router } from 'express';
import { registerClient } from '../controllers/clientController';

const router = Router();

// Ruta para registrar un cliente
router.post('/clientes', registerClient);

export default router;

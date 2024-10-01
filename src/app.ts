import express from 'express';
import clientRoutes from './routes/clientRoutes';
import { saleSave } from './controllers/sale-controller';
import cors from 'cors';

// Crea la aplicación de Express
const app = express();

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', clientRoutes);
app.use('/api', saleSave);

// Exporta la aplicación sin arrancar el servidor
export default app;

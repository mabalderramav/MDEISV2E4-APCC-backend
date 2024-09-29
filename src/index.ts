import express from 'express';
import clientRoutes from './routes/clientRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

var cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app; // Exporta el app para usarlo en pruebas con supertest

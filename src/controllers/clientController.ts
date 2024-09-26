import { Request, Response } from 'express';
import { registerClientService } from '../services/clientService';

// Controlador para registrar un cliente
export async function registerClient(req: Request, res: Response) {
  try {
    const clientData = req.body; // Datos del cliente que envía el usuario
    const result = await registerClientService(clientData); // Llamamos al servicio
    res.status(200).json(result); // Devolvemos el resultado en formato JSON
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message }); // Manejo de errores
  }
}

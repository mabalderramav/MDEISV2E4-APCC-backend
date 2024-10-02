import z from 'zod';
import { Client } from '../models/Client';
import { ClientRepository } from '../repositories/ClientRepository';

// Esquema de validación del cliente usando Zod
const clientSchema = z.object({
  code: z.string(),
  name: z.string(),
  ciNit: z.string().min(7, { message: 'CI/NIT debe tener al menos 7 caracteres' }),
  documentType: z.enum(['CI', 'NIT']),
  email: z.string().email({ message: 'El formato del email es inválido' }),
});

export async function registerClientService(clientData: any): Promise<any> {
  // 1. Validación de datos usando Zod
  const parsed = clientSchema.safeParse(clientData);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message); // Lanzar error si los datos no son válidos
  }

  // 2. Crear una instancia del modelo `Client`
  const { code, name, ciNit, documentType, email } = clientData;
  const client = new Client(code, name, ciNit, documentType, email);

  // 3. Guardar el cliente en la base de datos utilizando el repositorio
  const clientRepository = new ClientRepository();
  try {
    const savedClient = await clientRepository.save(client);

    // 4. Devolver el cliente guardado en la respuesta
    return {
      success: true,
      message: 'Cliente registrado correctamente',
      client: {
        code: savedClient.code,
        name: savedClient.name,
        ciNit: savedClient.cinit,
        documentType: savedClient.documenttype,
        email: savedClient.email,
      },
    };
  } catch (error: any) {
    if (error?.detail) {
      throw new Error(error?.detail);
    }
    throw new Error('Error al registrar el cliente en la base de datos');
  }
}

export async function getClientService(code: string): Promise<any> {
  // 3. Guardar el cliente en la base de datos utilizando el repositorio
  const clientRepository = new ClientRepository();
  try {
    const savedClient = await clientRepository.findByCode(code);

    // 4. Devolver el cliente guardado en la respuesta
    return savedClient;
  } catch (error: any) {
    if (error?.detail) {
      throw new Error(error?.detail);
    }
    throw new Error('Error al registrar el cliente en la base de datos');
  }
}

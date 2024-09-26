import { describe, it, expect, vi } from 'vitest';
import { registerClientService } from '../services/clientService';
import { ClientRepository } from '../repositories/ClientRepository';
import { Client } from '../models/Client';

// Mock del ClientRepository
vi.mock('../repositories/ClientRepository');

describe('registerClientService', () => {
  it('debería registrar un cliente exitosamente', async () => {
    // Mock del cliente que será retornado por el repositorio simulado
    const mockClient = new Client(
      '1',
      'Juan Pérez',
      '12345678',
      'CI',
      'juanperez@mail.com',
    );

    // Simula el comportamiento del método `save` del repositorio
    ClientRepository.prototype.save = vi.fn().mockResolvedValue(mockClient);

    // Datos de entrada
    const clientData = {
      code: '1',
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'juanperez@mail.com',
    };

    // Llamamos al servicio
    const result = await registerClientService(clientData);

    // Comprobamos el resultado
    expect(result.success).toBe(true);
    expect(result.message).toBe('Cliente registrado correctamente');
    expect(result.client).toEqual(mockClient);
  });

  it('debería lanzar un error si los datos son inválidos', async () => {
    // Datos inválidos (email incorrecto)
    const invalidClientData = {
      code: '1',
      name: 'Juan Pérez',
      ciNit: '12345678',
      documentType: 'CI',
      email: 'email-invalido',
    };

    // Comprobamos que el servicio lanza un error de validación
    await expect(registerClientService(invalidClientData)).rejects.toThrow(
      'El formato del email es inválido',
    );
  });
});

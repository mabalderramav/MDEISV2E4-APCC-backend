import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../app'; // Importa tu aplicación Express
vi.mock('../services/saleService');

describe('POST /api/sales', () => {
  it('debería registrar una venta exitosamente', async () => {
    // Hacemos la solicitud a la ruta con datos de ejemplo
    const response = await request(app)
      .post('/api/sales')
      .send({
        clientCode: '1',
        payCondition: 'efectivo',
        total: 10,
        productsItem: [
          {
            code: '1',
            name: 'leche',
            amount: 2,
            price: 5,
            subTotal: 10,
          },
        ],
      });
    console.log('-----', response);
    expect(response.status).toBe(200);
  });
});

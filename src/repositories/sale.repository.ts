import { Sale } from '../models/sale.model';
import pool from '../config/db';
export class SaleRepository {
  async save(clientId: number, total: number): Promise<Sale> {
    const result = await pool.query(
      `INSERT INTO sales (client_id, total) VALUES ($1, $2)
            RETURNING *`,
      [clientId, total]
    );
    return result.rows[0];
  }
}

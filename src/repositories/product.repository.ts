import pool from '../config/db';
import { Product } from '../models/product.model';
export class ProductRepository {
  async findByCode(code: string): Promise<Product | null> {
    const res = await pool.query(`SELECT * FROM products WHERE code = $1`, [code]);
    return res.rows.length > 0 ? res.rows[0] : null;
  }
}

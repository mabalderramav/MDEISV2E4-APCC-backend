import { SaleProduct } from '../models/sale-product.model';
import pool from '../config/db';

export class SaleProductRepository {
  async saveDetails(product: SaleProduct) {
    console.log(JSON.stringify(product));
    const result = await pool.query(
      `INSERT INTO sales_products (sales_id, products_id, amount, price ,sub_total) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
      [product.saleId, product.productId, product.amount, product.price, product.subtotal]
    );
    return result.rows[0];
  }
}

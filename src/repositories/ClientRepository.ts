import pool from '../config/db';
import { Client } from '../models/Client';

export class ClientRepository {
  // Método para guardar un cliente en la base de datos
  async save(client: Client): Promise<Client> {
    const { code, name, cinit, documenttype, email } = client;

    const result = await pool.query(
      `INSERT INTO clientes (code, name, cinit, documenttype, email) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [code, name, cinit, documenttype, email]
    );

    const savedClient = result.rows[0];
    return new Client(savedClient.code, savedClient.name, savedClient.cinit, savedClient.documenttype, savedClient.email);
  }
  async findByCode(code: string): Promise<Client | null> {
    const res = await pool.query(`select * from clientes where code = $1`, [code]);
    return res.rows.length > 0 ? res.rows[0] : null;
  }
  async findIdByCode(code: string): Promise<number> {
    const res = await pool.query(`select * from clientes where code = $1`, [code]);
    return res.rows[0].id;
  }
}

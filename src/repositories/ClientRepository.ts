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
      [code, name, cinit, documenttype, email],
    );

    const savedClient = result.rows[0];
    return new Client(
      savedClient.code,
      savedClient.name,
      savedClient.cinit,
      savedClient.documenttype,
      savedClient.email,
    );
  }
}

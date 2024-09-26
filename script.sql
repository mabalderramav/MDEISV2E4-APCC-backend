CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50),
  name VARCHAR(100),
  ciNit VARCHAR(20),
  documentType VARCHAR(5),
  email VARCHAR(100)
);

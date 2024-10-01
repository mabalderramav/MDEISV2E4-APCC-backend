CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  name VARCHAR(100),
  ciNit VARCHAR(20),
  documentType VARCHAR(5),
  email VARCHAR(100)
);
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  name VARCHAR(100),
  price decimal(10,2)
);

insert  into  products (code, name,price) values ('1', 'leche', 5);
insert  into  products (code, name,price) values ('2', 'queso', 7);
insert  into  products (code, name,price) values ('3', 'mantequilla', 15);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    client_id serial references clientes(id),
    total decimal(10,2)
);

create table sales_products
(
    sales_id serial,
    products_id serial,
    price decimal(10,2),
    amount int,
    sub_total decimal(10,2),
    primary key(sales_id, products_id),
    CONSTRAINT fk_sales  FOREIGN KEY(sales_id)   REFERENCES sales(id),
    CONSTRAINT fk_product  FOREIGN KEY(products_id)   REFERENCES products(id)
);

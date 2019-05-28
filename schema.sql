CREATE DATABASE bamazon;

USE BAMAZON;

CREATE TABLE products (
  item_id integer AUTO_INCREMENT primary key,
  product_name varchar(50) not null,
  department_name varchar(50) not null,
  price decimal(5,2) not null,
  stock_quantity integer not null
);
-- create new database called "bamazon_DB" with table called "products"
-- products table will have each of the following columns:
    --item_id (unique id for each product)
    --product_name (name of product)
    --department_name
    --price
    --stock_quantity
--populate database with 10 different products

--create database here
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db
USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    item_price INT,
    stock_quantity INT,
    PRIMARY KEY (item_id)
    )

INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('Treehut Watch', 'Men Fashion', 55, 10);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('Tray Table Set', 'Home Decor', 125, 5);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('XBOX One', 'Electronics', 250, 20);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('Nike Freefoam Shoes', 'Men Fashion', 75, 15);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('Sony TV', 'Electronics', 275, 10);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('H&M Recliner', 'Furniture', 130, 3);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('H&M Couch', 'Furniture', 280, 2);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('Hipster Posters', 'Home Decor', 60, 30);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('Madden 18', 'Electronics', 55, 30);
INSERT INTO products (item_name, department_name, item_price, stock_quantity)
values ('Steve Madden Boots', 'Men Fashion', 130, 10);

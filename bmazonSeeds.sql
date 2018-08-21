DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("LG G4 Cellphone", "Electronic", 490, 100);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Levi Jeans", "Appreal", 30, 550);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Milk Tea", "Food", 4, 900);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Natuilus Watch Series. 9 LT", "Appreal", 9999, 10);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Nikon D810 DSLR Camera", "Electronic", 4000, 100);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Lucas Candy - Melon Flavor", "Food", 1, 9999);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Le Zeplin Number 1 CD", "Music", 9999, 1);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Humanoid Robot", "Electronic", 100000, 1);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Megatron", "Electronic", 10000000, 1);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Dr. Pepper", "Food", 99999, 1);